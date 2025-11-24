const defaultCors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function buildCorsHeaders(env, extra = {}) {
  const origin = env?.CORS_ALLOW_ORIGIN || '*';
  return {
    ...defaultCors,
    'Access-Control-Allow-Origin': origin,
    ...extra,
  };
}

function deriveSiteUrl(request, env) {
  return (
    env?.SITE_URL ||
    request.headers.get('origin') ||
    `https://${request.headers.get('host')}`
  );
}

function mapLineItems(items = []) {
  return items.map((item) => {
    const amount = Math.round(Number(item.price || 0) * 100);

    if (!amount || amount < 0) {
      throw new Error(`Ungültiger Preis für ${item?.product ?? 'Unbekannt'}`);
    }

    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${item.product} (${item.size})`,
          description: `Mahlgrad: ${item.grind}`,
          images: item.image ? [item.image] : [],
        },
        unit_amount: amount,
      },
      quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
    };
  });
}

function calculateCartWeight(items = []) {
  let totalWeight = 0;
  
  items.forEach((item) => {
    const size = item.size || '';
    let itemWeight = 0;
    
    if (size === '250g') {
      itemWeight = 0.25; // 0.25 kg
    } else if (size === '500g') {
      itemWeight = 0.5; // 0.5 kg
    }
    
    const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
    totalWeight += itemWeight * quantity;
  });
  
  return totalWeight;
}

function calculateDHLShipping(weight) {
  // DHL standard rates for Germany (in cents)
  if (weight <= 2) {
    return 490; // €4.90
  } else if (weight <= 5) {
    return 690; // €6.90
  } else if (weight <= 10) {
    return 890; // €8.90
  } else {
    return 1690; // €16.90 (up to 31.5kg)
  }
}

function isHammAddress(postalCode) {
  if (!postalCode) return false;
  
  // Hamm PLZ range: 59063-59077
  const plz = parseInt(postalCode, 10);
  return plz >= 59063 && plz <= 59077;
}

function shippingOptions(cartWeight) {
  const options = [];
  
  // Calculate DHL shipping cost based on weight
  const dhlCost = calculateDHLShipping(cartWeight);
  
  // Free courier option for Hamm (will be shown for Hamm addresses)
  options.push({
    shipping_rate_data: {
      type: 'fixed_amount',
      display_name: 'Kostenloser Kurier (Hamm)',
      fixed_amount: {
        amount: 0,
        currency: 'eur',
      },
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 1 },
        maximum: { unit: 'business_day', value: 2 },
      },
      metadata: {
        hamm_only: 'true',
        postal_code_range: '59063-59077',
      },
    },
  });
  
  // DHL shipping option based on weight
  let dhlDisplayName = 'DHL Versand';
  if (cartWeight <= 2) {
    dhlDisplayName = 'DHL Versand (bis 2kg)';
  } else if (cartWeight <= 5) {
    dhlDisplayName = 'DHL Versand (bis 5kg)';
  } else if (cartWeight <= 10) {
    dhlDisplayName = 'DHL Versand (bis 10kg)';
  } else {
    dhlDisplayName = 'DHL Versand (bis 31.5kg)';
  }
  
  options.push({
    shipping_rate_data: {
      type: 'fixed_amount',
      display_name: dhlDisplayName,
      fixed_amount: {
        amount: dhlCost,
        currency: 'eur',
      },
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 2 },
        maximum: { unit: 'business_day', value: 5 },
      },
      metadata: {
        dhl_shipping: 'true',
        weight_based: 'true',
      },
    },
  });
  
  return options;
}

export const onRequestOptions = ({ env }) =>
  new Response(null, {
    status: 200,
    headers: buildCorsHeaders(env),
  });

export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = buildCorsHeaders(env, {
    'Content-Type': 'application/json',
  });

  if (!env?.STRIPE_SECRET_KEY) {
    return new Response(
      JSON.stringify({ error: 'STRIPE_SECRET_KEY nicht konfiguriert' }),
      { status: 500, headers: corsHeaders },
    );
  }

  try {
    const body = await request.json();
    const { items } = body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Keine Artikel im Warenkorb' }),
        { status: 400, headers: corsHeaders },
      );
    }

    // Calculate cart weight for shipping cost calculation
    const cartWeight = calculateCartWeight(items);

    const siteUrl = deriveSiteUrl(request, env);

    const params = new URLSearchParams({
      mode: 'payment',
      locale: 'de',
      success_url: `${siteUrl.replace(/\/$/, '')}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl.replace(/\/$/, '')}/shop/shop.html`,
      'billing_address_collection': 'required',
      'shipping_address_collection[allowed_countries][0]': 'DE',
      'shipping_address_collection[allowed_countries][1]': 'AT',
      'shipping_address_collection[allowed_countries][2]': 'CH',
      'phone_number_collection[enabled]': 'true',
      // Payment Methods: Kreditkarte + SEPA Direct Debit (deutsche Banküberweisung)
      'payment_method_types[0]': 'card',
      'payment_method_types[1]': 'sepa_debit',
    });

    mapLineItems(items).forEach((lineItem, index) => {
      params.append(`line_items[${index}][price_data][currency]`, lineItem.price_data.currency);
      params.append(`line_items[${index}][price_data][product_data][name]`, lineItem.price_data.product_data.name);
      params.append(
        `line_items[${index}][price_data][product_data][description]`,
        lineItem.price_data.product_data.description,
      );
      if (lineItem.price_data.product_data.images.length > 0) {
        params.append(
          `line_items[${index}][price_data][product_data][images][0]`,
          lineItem.price_data.product_data.images[0],
        );
      }
      params.append(`line_items[${index}][price_data][unit_amount]`, String(lineItem.price_data.unit_amount));
      params.append(`line_items[${index}][quantity]`, String(lineItem.quantity));
    });

    shippingOptions(cartWeight).forEach((option, index) => {
      params.append(
        `shipping_options[${index}][shipping_rate_data][type]`,
        option.shipping_rate_data.type,
      );
      params.append(
        `shipping_options[${index}][shipping_rate_data][display_name]`,
        option.shipping_rate_data.display_name,
      );
      params.append(
        `shipping_options[${index}][shipping_rate_data][fixed_amount][amount]`,
        String(option.shipping_rate_data.fixed_amount.amount),
      );
      params.append(
        `shipping_options[${index}][shipping_rate_data][fixed_amount][currency]`,
        option.shipping_rate_data.fixed_amount.currency,
      );
      if (option.shipping_rate_data.delivery_estimate) {
        params.append(
          `shipping_options[${index}][shipping_rate_data][delivery_estimate][minimum][unit]`,
          option.shipping_rate_data.delivery_estimate.minimum.unit,
        );
        params.append(
          `shipping_options[${index}][shipping_rate_data][delivery_estimate][minimum][value]`,
          String(option.shipping_rate_data.delivery_estimate.minimum.value),
        );
        params.append(
          `shipping_options[${index}][shipping_rate_data][delivery_estimate][maximum][unit]`,
          option.shipping_rate_data.delivery_estimate.maximum.unit,
        );
        params.append(
          `shipping_options[${index}][shipping_rate_data][delivery_estimate][maximum][value]`,
          String(option.shipping_rate_data.delivery_estimate.maximum.value),
        );
      }
      // Add metadata if present
      if (option.shipping_rate_data.metadata) {
        Object.keys(option.shipping_rate_data.metadata).forEach((key) => {
          params.append(
            `shipping_options[${index}][shipping_rate_data][metadata][${key}]`,
            String(option.shipping_rate_data.metadata[key]),
          );
        });
      }
    });

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeResponse.json();

    if (!stripeResponse.ok) {
      throw new Error(session?.error?.message || 'Stripe API Fehler');
    }

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error('Stripe checkout error:', error);
    const status = error?.statusCode ?? 500;

    return new Response(
      JSON.stringify({
        error: 'Checkout konnte nicht erstellt werden',
        message: error?.message ?? 'Unbekannter Fehler',
      }),
      { status, headers: corsHeaders },
    );
  }
}

export const onRequestGet = () =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });

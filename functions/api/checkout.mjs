import Stripe from 'stripe';

const STRIPE_API_VERSION = '2024-11-20';

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

function createStripeClient(env) {
  if (!env?.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  return new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION,
    httpClient: Stripe.createFetchHttpClient(),
  });
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

function shippingOptions() {
  return [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        display_name: 'Standardversand',
        fixed_amount: {
          amount: 490,
          currency: 'eur',
        },
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 2 },
          maximum: { unit: 'business_day', value: 5 },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        display_name: 'Kostenloser Versand (ab 30€)',
        fixed_amount: {
          amount: 0,
          currency: 'eur',
        },
      },
    },
  ];
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

  try {
    const body = await request.json();
    const { items } = body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Keine Artikel im Warenkorb' }),
        { status: 400, headers: corsHeaders },
      );
    }

    const stripe = createStripeClient(env);
    const siteUrl = deriveSiteUrl(request, env);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'sepa_debit'],
      line_items: mapLineItems(items),
      success_url: `${siteUrl.replace(/\/$/, '')}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl.replace(/\/$/, '')}/shop/shop.html`,
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'],
      },
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      shipping_options: shippingOptions(),
      locale: 'de',
    });

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

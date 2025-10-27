// Netlify Function: Create Stripe Checkout Session
// This function creates a Stripe Checkout session for the shop

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { items } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Keine Artikel im Warenkorb' })
      };
    }

    // Create line items for Stripe
    const lineItems = items.map(item => {
      const priceInCents = Math.round(item.price * 100);

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${item.product} (${item.size})`,
            description: `Mahlgrad: ${item.grind}`,
            images: item.image ? [item.image] : [],
          },
          unit_amount: priceInCents,
        },
        quantity: item.quantity || 1,
      };
    });

    // Get the site URL from environment or construct it
    const siteUrl = process.env.URL || 'http://localhost:8888';

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal', 'sepa_debit'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/faensen_shop_1.html`,
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'],
      },
      locale: 'de',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 490, // 4.90 EUR shipping
              currency: 'eur',
            },
            display_name: 'Standardversand',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0, // Free shipping over 30 EUR
              currency: 'eur',
            },
            display_name: 'Kostenloser Versand (ab 30€)',
          },
        },
      ],
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ sessionId: session.id, url: session.url })
    };

  } catch (error) {
    console.error('Stripe error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Es gab einen Fehler beim Erstellen der Checkout-Session',
        details: error.message
      })
    };
  }
};

// Vereinfachte Netlify Function für Stripe Checkout
// Erstellt eine Checkout Session mit mehreren Produkten

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { items } = JSON.parse(event.body);

    if (!items || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Keine Artikel im Warenkorb' })
      };
    }

    console.log('Creating checkout session for items:', items);

    // Line Items für Stripe erstellen
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${item.product} (${item.size})`,
          description: `Mahlgrad: ${item.grind}`,
          images: item.image ? [item.image] : []
        },
        unit_amount: Math.round(item.price * 100) // Preis in Cents
      },
      quantity: 1
    }));

    // Stripe Checkout Session erstellen
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'sepa_debit'], // Karte + Banküberweisung
      line_items: lineItems,
      mode: 'payment',
      success_url: `${event.headers.origin || 'https://maexftw.github.io'}/CODEX/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin || 'https://maexftw.github.io'}/CODEX/.superdesign/design_iterations/faensen_shop_1.html`,
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH']
      },
      locale: 'de',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true
      }
    });

    console.log('Checkout session created:', session.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url
      })
    };

  } catch (error) {
    console.error('Stripe error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Fehler beim Erstellen der Checkout-Session',
        message: error.message
      })
    };
  }
};

// Check available payment methods via Stripe API
const defaultCors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

function buildCorsHeaders(env, extra = {}) {
  const origin = env?.CORS_ALLOW_ORIGIN || '*';
  return {
    ...defaultCors,
    'Access-Control-Allow-Origin': origin,
    ...extra,
  };
}

export const onRequestOptions = ({ env }) =>
  new Response(null, {
    status: 200,
    headers: buildCorsHeaders(env),
  });

export async function onRequestGet(context) {
  const { env } = context;
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
    // Test verschiedene Payment Methods durch Erstellen einer Test-Session
    const testPaymentMethods = ['card', 'sepa_debit', 'customer_balance'];
    const availableMethods = [];
    const unavailableMethods = [];

    for (const method of testPaymentMethods) {
      try {
        const testParams = new URLSearchParams({
          mode: 'payment',
          'line_items[0][price_data][currency]': 'eur',
          'line_items[0][price_data][product_data][name]': 'Test',
          'line_items[0][price_data][unit_amount]': '100',
          'line_items[0][quantity]': '1',
          'payment_method_types[0]': method,
          success_url: 'https://example.com/success',
          cancel_url: 'https://example.com/cancel',
        });

        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: testParams.toString(),
        });

        const session = await response.json();

        if (response.ok && session.id) {
          availableMethods.push(method);
          // Session löschen (optional)
          if (session.id) {
            await fetch(`https://api.stripe.com/v1/checkout/sessions/${session.id}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
              },
            }).catch(() => {});
          }
        } else {
          unavailableMethods.push({
            method,
            error: session?.error?.message || 'Unbekannter Fehler',
          });
        }
      } catch (error) {
        unavailableMethods.push({
          method,
          error: error.message,
        });
      }
    }

    return new Response(
      JSON.stringify({
        available: availableMethods,
        unavailable: unavailableMethods,
        note: 'Getestet durch Erstellen von Test-Checkout-Sessions',
      }),
      { status: 200, headers: corsHeaders },
    );
  } catch (error) {
    console.error('Payment methods check error:', error);
    return new Response(
      JSON.stringify({
        error: 'Fehler beim Prüfen der Payment Methods',
        message: error?.message || 'Unbekannter Fehler',
      }),
      { status: 500, headers: corsHeaders },
    );
  }
}


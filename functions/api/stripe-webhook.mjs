import { createHmac } from 'node:crypto';

function verifySignature(payload, signatureHeader, secret) {
  if (!signatureHeader || !secret) {
    return false;
  }

  const parts = signatureHeader.split(',').reduce(
    (acc, part) => {
      const [key, value] = part.split('=');
      acc[key] = value;
      return acc;
    },
    {},
  );

  if (!parts.t || !parts.v1) {
    return false;
  }

  const signedPayload = `${parts.t}.${payload}`;
  const expectedSignature = createHmac('sha256', secret).update(signedPayload).digest('hex');

  return parts.v1 === expectedSignature;
}

export async function onRequestPost({ request, env }) {
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new Response(
      JSON.stringify({ error: 'Fehlende Stripe-Signatur' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  if (!env?.STRIPE_WEBHOOK_SECRET) {
    return new Response(
      JSON.stringify({ error: 'Webhook Secret nicht gesetzt' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const payload = await request.text();

  if (!verifySignature(payload, signature, env.STRIPE_WEBHOOK_SECRET)) {
    return new Response(
      JSON.stringify({ error: 'Webhook Signatur ungültig' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const event = JSON.parse(payload);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Checkout abgeschlossen', {
          sessionId: session.id,
          email: session.customer_details?.email,
          total: session.amount_total,
        });
        break;
      }
      case 'checkout.session.expired':
        console.log('Checkout Session abgelaufen', event.data.object.id);
        break;
      case 'payment_intent.succeeded':
        console.log('PaymentIntent erfolgreich', event.data.object.id);
        break;
      case 'payment_intent.payment_failed':
        console.error('PaymentIntent fehlgeschlagen', event.data.object.id);
        break;
      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Stripe Webhook Fehler:', error);
    return new Response(
      JSON.stringify({
        error: 'Webhook konnte nicht verarbeitet werden',
        message: error?.message ?? 'Unbekannter Fehler',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }
}

export const onRequestGet = () =>
  new Response('Method not allowed', { status: 405 });

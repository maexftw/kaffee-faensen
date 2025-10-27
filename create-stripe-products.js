/**
 * Stripe Product Creation Script
 *
 * Dieses Script erstellt alle Kaffee Fänsen Produkte in Stripe mit allen Variationen
 * (Größen und Mahlgrade) und generiert Payment Links für jede Kombination.
 *
 * VERWENDUNG:
 * node create-stripe-products.js
 */

// Load environment variables from .env file
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');

// Alle 11 Produkte mit Details
const products = [
    {
        handle: "hammer-spezial",
        name: "Hammer Spezial",
        description: "Würziger Hochland-Arabica mit nussiger Note. Unser meistverkaufter Kaffee seit über 50 Jahren.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 6.10, "500g": 12.20 },
        badge: "Bestseller"
    },
    {
        handle: "cafe-haus",
        name: "Café Haus",
        description: "Milde Hausmischung mit ausgewogenem Aroma. Perfekt für jeden Tag.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 5.90, "500g": 11.80 }
    },
    {
        handle: "maragogype",
        name: "Maragogype",
        description: "Premium Riesenbohne aus Mittelamerika. Vollmundig und aromatisch.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 7.50, "500g": 15.00 },
        badge: "Premium"
    },
    {
        handle: "ratsherren-mischung",
        name: "Ratsherren Mischung",
        description: "Traditionelle Dortmunder Röstung seit 1844. Kräftig und charaktervoll.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 6.50, "500g": 13.00 }
    },
    {
        handle: "peru",
        name: "Peru",
        description: "Single Origin aus Peru. Sanft, nussig mit leichter Süße.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 6.80, "500g": 13.60 },
        badge: "Neu"
    },
    {
        handle: "brasil",
        name: "Brasil",
        description: "Klassischer brasilianischer Kaffee. Schokoladig und mild.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 5.80, "500g": 11.60 }
    },
    {
        handle: "espresso",
        name: "Espresso",
        description: "Intensive Espressoröstung. Perfekt für Siebträger und Espressokannen.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 6.40, "500g": 12.80 },
        badge: "Bestseller"
    },
    {
        handle: "creme",
        name: "Crème",
        description: "Besonders cremige Röstung. Ideal für Cappuccino und Latte Macchiato.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 6.20, "500g": 12.40 }
    },
    {
        handle: "cappuccino",
        name: "Cappuccino",
        description: "Speziell für Cappuccino entwickelt. Harmonisch und vollmundig.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 6.30, "500g": 12.60 }
    },
    {
        handle: "naturmild",
        name: "Naturmild",
        description: "Schonend geröstet, besonders bekömmlich. Für empfindliche Mägen.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 6.00, "500g": 12.00 }
    },
    {
        handle: "saurearm",
        name: "Säurearm",
        description: "Extra lange geröstet für minimalen Säuregehalt. Sehr magenfreundlich.",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        pricing: { "250g": 6.00, "500g": 12.00 }
    }
];

const sizes = ["250g", "500g"];
const grinds = [
    "Ganze Bohne",
    "Filterkaffee",
    "Siebträger",
    "French Press",
    "Espressokanne"
];

// Ergebnis-Objekt zum Speichern aller Payment Links
const paymentLinks = {};

async function createProducts() {
    console.log('🚀 Starte Produkt-Erstellung in Stripe...\n');

    let createdCount = 0;
    let totalProducts = products.length * sizes.length * grinds.length;

    for (const product of products) {
        console.log(`\n📦 Erstelle: ${product.name}`);
        paymentLinks[product.handle] = {};

        for (const size of sizes) {
            const price = product.pricing[size];
            const priceInCents = Math.round(price * 100);

            paymentLinks[product.handle][size] = {};

            for (const grind of grinds) {
                try {
                    // 1. Stripe Product erstellen (oder existierendes finden)
                    const stripeProduct = await stripe.products.create({
                        name: `${product.name} - ${size}`,
                        description: `${product.description}\n\nGröße: ${size}\nMahlgrad: ${grind}`,
                        images: [product.image],
                        metadata: {
                            handle: product.handle,
                            size: size,
                            grind: grind,
                            badge: product.badge || ''
                        }
                    });

                    // 2. Price erstellen
                    const stripePrice = await stripe.prices.create({
                        product: stripeProduct.id,
                        unit_amount: priceInCents,
                        currency: 'eur',
                        metadata: {
                            size: size,
                            grind: grind
                        }
                    });

                    // 3. Payment Link erstellen
                    const paymentLink = await stripe.paymentLinks.create({
                        line_items: [{
                            price: stripePrice.id,
                            quantity: 1,
                        }],
                        allow_promotion_codes: true,
                        shipping_address_collection: {
                            allowed_countries: ['DE', 'AT', 'CH'],
                        },
                        after_completion: {
                            type: 'redirect',
                            redirect: {
                                url: 'https://maexftw.github.io/CODEX/success.html',
                            },
                        },
                    });

                    paymentLinks[product.handle][size][grind] = paymentLink.url;

                    createdCount++;
                    console.log(`  ✅ ${size} - ${grind} → ${paymentLink.url.substring(0, 50)}...`);

                    // Rate limiting: Kleine Pause zwischen Requests
                    await new Promise(resolve => setTimeout(resolve, 100));

                } catch (error) {
                    console.error(`  ❌ Fehler bei ${size} - ${grind}:`, error.message);
                }
            }
        }
    }

    console.log(`\n\n✅ Fertig! ${createdCount} von ${totalProducts} Produkt-Variationen erstellt.\n`);

    // Ergebnis als JSON speichern
    const outputPath = './stripe-payment-links.json';
    fs.writeFileSync(outputPath, JSON.stringify(paymentLinks, null, 2));
    console.log(`💾 Payment Links gespeichert in: ${outputPath}\n`);

    // Auch als JavaScript-Modul für direkten Import
    const jsOutput = `// Auto-generiert am ${new Date().toISOString()}
// Stripe Payment Links für alle Kaffee Fänsen Produkte

export const STRIPE_PAYMENT_LINKS = ${JSON.stringify(paymentLinks, null, 2)};
`;
    fs.writeFileSync('./stripe-payment-links.js', jsOutput);
    console.log(`💾 JavaScript-Modul gespeichert in: ./stripe-payment-links.js\n`);

    return paymentLinks;
}

// Script ausführen
if (require.main === module) {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('❌ FEHLER: STRIPE_SECRET_KEY nicht gesetzt!');
        console.error('Verwende: STRIPE_SECRET_KEY=sk_test_... node create-stripe-products.js');
        process.exit(1);
    }

    createProducts()
        .then(() => {
            console.log('🎉 Alle Produkte erfolgreich in Stripe erstellt!');
            console.log('\nNächste Schritte:');
            console.log('1. Öffne stripe-payment-links.json');
            console.log('2. Die Shop-Seite wird automatisch aktualisiert');
            console.log('3. Teste einen Checkout mit einer Test-Karte');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Fehler:', error);
            process.exit(1);
        });
}

module.exports = { createProducts };

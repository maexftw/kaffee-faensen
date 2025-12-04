// Kaffee Fänsen - Zentrale Produktdaten
// Diese Datei wird von shop.html und den Produktdetailseiten gemeinsam genutzt

const FAENSEN_PRODUCTS = [
    {
        handle: "hammer-spezial",
        name: "Hammer Spezial",
        shortDescription: "Würziger Hochland-Arabica mit nussiger Note",
        fullDescription: "Ein mittlere Röstung bestehend aus 100% reinem Hochland-Arabica mit würzigem Charakter und ausgewogener Säure. Das Produkt bietet ein harmonisches Geschmackserlebnis für anspruchsvolle Kaffeegenießer.",
        flavorProfile: "Vollmundiger Kaffee mit einer harmonischen Balance zwischen Intensität und Milde. Würziger Hochland-Arabica mit nussiger Note, mittlere Röstung, ausgewogene Säure.",
        roastLevel: "Mittlere Röstung",
        origin: "Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.10,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.10, "500g": 12.20 },
        rating: 4.8,
        reviews: 127,
        badge: "Bestseller",
        brewingTips: [
            { method: "Filterkaffee", description: "Für einen klaren, ausgewogenen Geschmack" },
            { method: "French Press", description: "Für vollmundiges Aroma und reichhaltige Textur" },
            { method: "Siebträger", description: "Für intensiven Espresso mit feiner Crema" },
            { method: "Espressokanne", description: "Für traditionelle, aromatische Zubereitung" }
        ]
    },
    {
        handle: "cafe-haus",
        name: "Café Haus",
        shortDescription: "Harmonischer Genuss mit ausgewogener Säure",
        fullDescription: "Eine sorgfältig komponierte Mischung, die durch ausgewogene Säure und hervorragende Verträglichkeit besticht. Ein gut verträglicher Kaffee mit einem runden, vollmundigen Geschmack.",
        flavorProfile: "Nussige Noten, feine Säure, mildes und aromatisches Profil für den täglichen Genuss. Mittlere Röstung mit harmonischer Balance zwischen Aroma und Säure.",
        roastLevel: "Mittlere Röstung",
        origin: "Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.30,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.30, "500g": 12.60 },
        rating: 4.9,
        reviews: 98,
        badge: null,
        brewingTips: [
            { method: "Filterkaffee", description: "Ideal für den täglichen Genuss" },
            { method: "French Press", description: "Für vollmundiges Aroma" },
            { method: "Siebträger", description: "Für cremigen Espresso" },
            { method: "Espressokanne", description: "Für traditionellen Genuss" }
        ]
    },
    {
        handle: "maragogype",
        name: "Maragogype",
        shortDescription: "Die edle Elefantenbohne mit fruchtiger Note",
        fullDescription: "Diese seltene Varietät, bekannt als die 'Elefantenbohne', zeichnet sich durch extra große Bohnen und ihr mildes, fruchtiges Aroma aus. Die sanfte Röstung bewahrt die delikaten Aromen und liefert ein harmonisches, ausgewogenes Profil.",
        flavorProfile: "Mild, fruchtig mit subtiler Säure. Die schonende Röstung bewahrt die delikaten Aromen der extra großen Bohnen.",
        roastLevel: "Mittlere Röstung",
        origin: "Hochland-Arabica (Elefantenbohne)",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 7.40,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 7.40, "500g": 14.80 },
        rating: 4.9,
        reviews: 156,
        badge: "Premium",
        brewingTips: [
            { method: "Filterkaffee", description: "Für klaren, ausgewogenen Geschmack" },
            { method: "French Press", description: "Für vollmundiges Aroma" },
            { method: "Siebträger", description: "Für milden Espresso mit feiner Crema" },
            { method: "Espressokanne", description: "Für traditionelle, aromatische Zubereitung" }
        ]
    },
    {
        handle: "ratsherren-mischung",
        name: "Ratsherren Mischung",
        shortDescription: "Kräftiger Genuss mit feiner Kakaonote",
        fullDescription: "Ein kräftiger und vollmundiger Charakter mit feinen Kakaonoten. Ausgewogene, blumige Säure und reiches Aroma für den täglichen Genuss. Aus den besten Anbaugebieten Guatemalas.",
        flavorProfile: "Kräftig und vollmundig mit feinen Kakaonoten. Ausgewogene, blumige Säure und intensives Aroma.",
        roastLevel: "Starke Röstung",
        origin: "Guatemala, Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.30,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.30, "500g": 12.60 },
        rating: 4.7,
        reviews: 84,
        badge: null,
        brewingTips: [
            { method: "Siebträger", description: "Für intensiven Espresso" },
            { method: "Espressokanne", description: "Für traditionellen, kräftigen Stil" },
            { method: "Filterkaffee", description: "Für ausgewogenen Geschmack" },
            { method: "French Press", description: "Für vollmundiges Aroma" }
        ]
    },
    {
        handle: "peru",
        name: "Peru",
        shortDescription: "Vollmundiger Hochland-Genuss mit feiner Säure",
        fullDescription: "100% gewaschener Hochland-Arabica aus biologischem Anbau in Peru. Die mittlere Röstung hebt die natürlichen Aromen der peruanischen Hochlandbohnen hervor und erzeugt einen vollmundigen Kaffee mit einer feinen, ausgewogenen Säure.",
        flavorProfile: "Vollmundig mit feiner, ausgewogener Säure. Die natürlichen Aromen der peruanischen Hochlandbohnen kommen voll zur Geltung.",
        roastLevel: "Mittlere Röstung",
        origin: "Peru, biologischer Anbau",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.40,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.40, "500g": 12.80 },
        rating: 4.8,
        reviews: 112,
        badge: "Neu",
        brewingTips: [
            { method: "Filterkaffee", description: "Für die besten Hochlandaromen" },
            { method: "French Press", description: "Für vollmundigen Genuss" },
            { method: "Siebträger", description: "Für aromatischen Espresso" },
            { method: "Espressokanne", description: "Für traditionelle Zubereitung" }
        ]
    },
    {
        handle: "brasil",
        name: "Brasil",
        shortDescription: "Mild-aromatischer Klassiker mit Schokoladennote",
        fullDescription: "Kräftiger Charakter und intensives, nussiges Aroma mit vollmundigem Geschmackserlebnis für anspruchsvolle Kaffeetrinker. Mittlere Röstung mit dunklen Nussnoten, harmonisches und ausgewogenes Profil mit dezenter Säure.",
        flavorProfile: "Kräftig und vollmundig mit dunklen Nussnoten. Harmonisch und ausgewogen mit dezenter Säure.",
        roastLevel: "Mittlere Röstung",
        origin: "Brasilien, Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.00,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.00, "500g": 12.00 },
        rating: 4.6,
        reviews: 93,
        badge: null,
        brewingTips: [
            { method: "Filterkaffee", description: "Für ausgewogenen Alltags-Kaffee" },
            { method: "French Press", description: "Für vollmundiges Aroma" },
            { method: "Siebträger", description: "Für cremigen Espresso" },
            { method: "Espressokanne", description: "Für klassischen Genuss" }
        ]
    },
    {
        handle: "espresso",
        name: "Espresso",
        shortDescription: "Intensive Röstung für perfekten Espresso-Genuss",
        fullDescription: "Ein vollmundiger Espresso mit intensivem Aroma, verfeinert durch Noten von Schokolade und Karamell. Die cremige Textur und der ausgeprägte Körper schaffen ein unvergleichliches Geschmackserlebnis.",
        flavorProfile: "Intensiv mit Noten von Schokolade und Karamell. Cremige Textur und ausgeprägter Körper.",
        roastLevel: "Mittlere Röstung",
        origin: "Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.50,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.50, "500g": 13.00 },
        rating: 4.9,
        reviews: 203,
        badge: "Bestseller",
        brewingTips: [
            { method: "Siebträger", description: "Die perfekte Wahl für cremigen Espresso" },
            { method: "Espressokanne", description: "Für intensiven, traditionellen Geschmack" },
            { method: "Filterkaffee", description: "Auch als starker Filterkaffee genießbar" },
            { method: "French Press", description: "Für kräftiges Aroma" }
        ]
    },
    {
        handle: "creme",
        name: "Crème",
        shortDescription: "Samtige Crema mit vollmundigem Körper",
        fullDescription: "Mittlere Röstung mit nussigen Aromen und ausgewogener Säure. Volles Aroma und samtige Textur bieten ein harmonisches Geschmackserlebnis für den täglichen Genuss.",
        flavorProfile: "Nussige Aromen, ausgewogene Säure, samtige Textur. Harmonisches Geschmackserlebnis.",
        roastLevel: "Mittlere Röstung",
        origin: "Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.20,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.20, "500g": 12.40 },
        rating: 4.7,
        reviews: 76,
        badge: null,
        brewingTips: [
            { method: "Siebträger", description: "Für perfekte Crema" },
            { method: "Espressokanne", description: "Für samtigen Genuss" },
            { method: "Filterkaffee", description: "Für milden Alltags-Kaffee" },
            { method: "French Press", description: "Für vollmundiges Aroma" }
        ]
    },
    {
        handle: "cappuccino",
        name: "Cappuccino",
        shortDescription: "Perfekt abgestimmt für cremigen Milchkaffee",
        fullDescription: "100% reiner Hochland-Arabica mit würzigem, vollmundigem Charakter und nussigen Untertönen. Ausgewogene Säure und mittlere Röstintensität mit mildem Finish - perfekt für Cappuccino und Milchkaffee-Spezialitäten.",
        flavorProfile: "Würzig, vollmundig mit nussigen Untertönen. Ausgewogene Säure, mittlere Röstintensität mit mildem Finish.",
        roastLevel: "Mittlere Röstung",
        origin: "Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.40,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.40, "500g": 12.80 },
        rating: 4.8,
        reviews: 145,
        badge: null,
        brewingTips: [
            { method: "Siebträger", description: "Ideal für Cappuccino und Latte" },
            { method: "Espressokanne", description: "Für kräftigen Milchkaffee-Basis" },
            { method: "French Press", description: "Für aromatischen Café au Lait" },
            { method: "Filterkaffee", description: "Auch pur ein Genuss" }
        ]
    },
    {
        handle: "naturmild",
        name: "Naturmild",
        shortDescription: "Besonders bekömmlich mit milder Röstung",
        fullDescription: "Sanfte Röstung mit feiner Kakao-Note. Weich, vollmundig und mit minimaler Säure - perfekt für den täglichen Genuss. Das schonende Röstverfahren hebt die delikaten Aromen hervor und reduziert die Säure.",
        flavorProfile: "Sanft, vollmundig mit feiner Kakao-Note. Minimale Säure, perfekt für den täglichen Genuss.",
        roastLevel: "Sanfte Röstung",
        origin: "Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.30,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.30, "500g": 12.60 },
        rating: 4.5,
        reviews: 67,
        badge: null,
        brewingTips: [
            { method: "Filterkaffee", description: "Für klaren, milden Geschmack" },
            { method: "French Press", description: "Für vollmundiges Aroma und reichhaltige Textur" },
            { method: "Espressokanne", description: "Für sanften Espresso" },
            { method: "Siebträger", description: "Für milden Espresso mit samtiger Crema" }
        ]
    },
    {
        handle: "saurearm",
        name: "Säurearm",
        shortDescription: "Magenschonend geröstet für empfindliche Genießer",
        fullDescription: "Ideal für empfindliche Mägen. Das schonende Röstungsverfahren minimiert den Säuregehalt bei hochwertig ausgewählten Bohnen. Der unverwechselbare Hochland-Arabica-Charakter mit feinen nussigen Noten bleibt dabei vollständig erhalten.",
        flavorProfile: "Nussige Noten, minimale Säure. Sanfte Röstung bewahrt vollständigen Geschmack bei maximaler Magenfreundlichkeit.",
        roastLevel: "Sanfte Röstung",
        origin: "Hochland-Arabica",
        image: "https://cdn.prod.website-files.com/67b880dcaaa044d288cc8f3d/67b895dd2cb7b5f32a1a5b54_smartmockups_lgdczczd.jpg",
        basePrice: 6.50,
        sizes: ["250g", "500g"],
        grinds: ["Ganze Bohne", "Filterkaffee", "Siebträger", "French Press", "Espressokanne"],
        pricing: { "250g": 6.50, "500g": 13.00 },
        rating: 4.7,
        reviews: 89,
        badge: null,
        brewingTips: [
            { method: "Filterkaffee", description: "Für magenfreundlichen Alltags-Kaffee" },
            { method: "French Press", description: "Für vollmundigen, säurearmen Genuss" },
            { method: "Siebträger", description: "Für milden Espresso" },
            { method: "Espressokanne", description: "Für traditionelle, magenschonende Zubereitung" }
        ]
    }
];

// Hilfsfunktion: Produkt nach Handle finden
function getProductByHandle(handle) {
    return FAENSEN_PRODUCTS.find(p => p.handle === handle) || null;
}

// Hilfsfunktion: Alle Produkte mit Badge filtern
function getProductsWithBadge(badge) {
    return FAENSEN_PRODUCTS.filter(p => p.badge === badge);
}

// Hilfsfunktion: Produkte nach Preis sortieren
function getProductsSortedByPrice(ascending = true) {
    return [...FAENSEN_PRODUCTS].sort((a, b) =>
        ascending ? a.basePrice - b.basePrice : b.basePrice - a.basePrice
    );
}

// Export für Module (falls verwendet)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FAENSEN_PRODUCTS, getProductByHandle, getProductsWithBadge, getProductsSortedByPrice };
}

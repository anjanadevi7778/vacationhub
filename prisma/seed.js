const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const allCategoryListings = [
  // --- Lux ---
  {
    title: "Pamir Mountain Luxury Retreat",
    description: "Breathtaking mountain villa with panoramic peaks, private chef, and heated infinity pool nestled in pristine alpine serenity.",
    imageSrc: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    category: "Lux",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 4,
    price: 320,
    country: "Afghanistan",
    region: "Asia",
    latlng: [33, 65],
  },
  {
    title: "French Riviera Saint-Tropez Grand Palace",
    description: "Ultimate Mediterranean mega-villa with private helipad, staff quarters, and panoramic Mediterranean sea views.",
    imageSrc: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    category: "Lux",
    roomCount: 6,
    bathroomCount: 6,
    guestCount: 12,
    price: 950,
    country: "France",
    region: "Europe",
    latlng: [46, 2],
  },

  // --- Beach ---
  {
    title: "Santorini Cliffside Sunset Villa",
    description: "Iconic whitewashed villa overlooking the azure Aegean sea with private plunge pool and sunset terrace.",
    imageSrc: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    category: "Beach",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    price: 280,
    country: "Greece",
    region: "Europe",
    latlng: [39, 22],
  },
  {
    title: "Bora Bora Lagoon Waterfront Villa",
    description: "Overwater tropical bungalow with coral reef beneath your deck, private sunbeds, and crystal turquoise waters.",
    imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    category: "Beach",
    roomCount: 2,
    bathroomCount: 2,
    guestCount: 4,
    price: 540,
    country: "Indonesia",
    region: "Asia",
    latlng: [-5, 120],
  },

  // --- Windmills ---
  {
    title: "Historic Zaanse Schans Windmill Home",
    description: "Authentic restored 18th-century Dutch windmill overlooking serene canal waterways and tulip pastures.",
    imageSrc: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80",
    category: "Windmills",
    roomCount: 2,
    bathroomCount: 1,
    guestCount: 4,
    price: 210,
    country: "Netherlands",
    region: "Europe",
    latlng: [52, 5],
  },
  {
    title: "Santorini Oia Windmill Suite",
    description: "Converted traditional Greek windmill perched atop dramatic Oia cliffs with unmatched sunset caldera views.",
    imageSrc: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    category: "Windmills",
    roomCount: 2,
    bathroomCount: 2,
    guestCount: 3,
    price: 295,
    country: "Greece",
    region: "Europe",
    latlng: [39, 22],
  },

  // --- Modern ---
  {
    title: "Malibu Oceanfront Modern Masterpiece",
    description: "Floor-to-ceiling glass walls, sleek minimalist design, private sundeck, and direct steps to the sand.",
    imageSrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    category: "Modern",
    roomCount: 4,
    bathroomCount: 3,
    guestCount: 8,
    price: 450,
    country: "United States",
    region: "Americas",
    latlng: [38, -97],
  },
  {
    title: "Tokyo Contemporary Glass Pavilion",
    description: "Award-winning architectural residence featuring an internal zen bamboo garden and open-concept skyline views.",
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    category: "Modern",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 5,
    price: 390,
    country: "Japan",
    region: "Asia",
    latlng: [36, 138],
  },

  // --- Countryside ---
  {
    title: "Tuscan Vineyard & Olive Grove Estate",
    description: "Charming restored 17th-century stone farmhouse surrounded by rolling hills, private pool, and outdoor pizza oven.",
    imageSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    category: "Countryside",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    price: 230,
    country: "Italy",
    region: "Europe",
    latlng: [43, 13],
  },
  {
    title: "Provence Lavender Farm Chateau",
    description: "Historic stone bastide enveloped by vibrant purple lavender fields, olive groves, and tranquil cypress alleys.",
    imageSrc: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    category: "Countryside",
    roomCount: 4,
    bathroomCount: 3,
    guestCount: 8,
    price: 290,
    country: "France",
    region: "Europe",
    latlng: [46, 2],
  },

  // --- Pools ---
  {
    title: "Ubud Tropical Rainforest Haven",
    description: "Eco-luxury villa with tiered private pool suspended over emerald river valley and palm canopy.",
    imageSrc: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    category: "Pools",
    roomCount: 2,
    bathroomCount: 2,
    guestCount: 4,
    price: 195,
    country: "Indonesia",
    region: "Asia",
    latlng: [-5, 120],
  },
  {
    title: "Amalfi Coast Cliffside Infinity Pool Villa",
    description: "Carved into sheer sea cliffs with an Olympic-sized heated infinity pool hanging over the Mediterranean.",
    imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    category: "Pools",
    roomCount: 4,
    bathroomCount: 3,
    guestCount: 8,
    price: 520,
    country: "Italy",
    region: "Europe",
    latlng: [43, 13],
  },

  // --- Islands ---
  {
    title: "Ibiza Clifftop Sunset Villa",
    description: "Stunning island residence with chill-out cabanas, infinity pool, sound system, and world-famous sunset vistas.",
    imageSrc: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=1200&q=80",
    category: "Islands",
    roomCount: 3,
    bathroomCount: 3,
    guestCount: 6,
    price: 340,
    country: "Spain",
    region: "Europe",
    latlng: [40, -4],
  },
  {
    title: "Maldives Private Island Coral Bungalow",
    description: "Exclusive private island villa surrounded by translucent lagoons and pristine untouched coral sandbars.",
    imageSrc: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    category: "Islands",
    roomCount: 2,
    bathroomCount: 2,
    guestCount: 4,
    price: 680,
    country: "Maldives",
    region: "Asia",
    latlng: [3, 73],
  },

  // --- Lake ---
  {
    title: "Lake Como Waterfront Villa & Private Dock",
    description: "Grand waterfront villa with private speedboat mooring, blooming gardens, and panoramic alpine lake scenery.",
    imageSrc: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
    category: "Lake",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    price: 380,
    country: "Italy",
    region: "Europe",
    latlng: [43, 13],
  },
  {
    title: "Lake Tahoe Timber Waterfront Lodge",
    description: "Direct lake frontage with private boat pier, massive stone fireplace, and crystal-clear mountain water views.",
    imageSrc: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
    category: "Lake",
    roomCount: 4,
    bathroomCount: 3,
    guestCount: 9,
    price: 410,
    country: "United States",
    region: "Americas",
    latlng: [38, -97],
  },

  // --- Skiing ---
  {
    title: "Zermatt Ski-In Luxury Chalet & Spa",
    description: "Ski-in/ski-out luxury alpine chalet featuring cedar sauna, outdoor heated jacuzzi, and Matterhorn views.",
    imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    category: "Skiing",
    roomCount: 5,
    bathroomCount: 4,
    guestCount: 10,
    price: 620,
    country: "Switzerland",
    region: "Europe",
    latlng: [47, 8],
  },
  {
    title: "Aspen Mountain Heated Chalet",
    description: "Premier slope-side timber lodge with heated outdoor terrace, hot tub, and ski valet access.",
    imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    category: "Skiing",
    roomCount: 4,
    bathroomCount: 4,
    guestCount: 8,
    price: 580,
    country: "United States",
    region: "Americas",
    latlng: [38, -97],
  },

  // --- Castles ---
  {
    title: "Château de la Loire Historical Castle",
    description: "Fairytale renaissance castle featuring grand banquet halls, antique suites, private chapel, and 50-acre park.",
    imageSrc: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=1200&q=80",
    category: "Castles",
    roomCount: 6,
    bathroomCount: 5,
    guestCount: 12,
    price: 890,
    country: "France",
    region: "Europe",
    latlng: [46, 2],
  },
  {
    title: "Scottish Highlands Medieval Castle",
    description: "Authentic 15th-century fortified tower castle on private loch with stone turrets and grand hearth.",
    imageSrc: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1200&q=80",
    category: "Castles",
    roomCount: 7,
    bathroomCount: 6,
    guestCount: 14,
    price: 750,
    country: "United Kingdom",
    region: "Europe",
    latlng: [54, -2],
  },

  // --- Caves ---
  {
    title: "Cappadocia Luxury Cave Sanctuary",
    description: "Ancient hand-carved stone palace with heated plunge tub, ornate Ottoman rugs, and sunrise balloon views.",
    imageSrc: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=1200&q=80",
    category: "Caves",
    roomCount: 2,
    bathroomCount: 2,
    guestCount: 4,
    price: 180,
    country: "Turkey",
    region: "Asia",
    latlng: [39, 35],
  },
  {
    title: "Matera Ancient Sassi Cave Suite",
    description: "UNESCO heritage subterranean dwelling sculpted into ancient stone, modernized with rain showers and wine cellar.",
    imageSrc: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    category: "Caves",
    roomCount: 2,
    bathroomCount: 1,
    guestCount: 3,
    price: 220,
    country: "Italy",
    region: "Europe",
    latlng: [43, 13],
  },

  // --- Camping ---
  {
    title: "Redwood Forest Glamping Eco-Dome",
    description: "Secluded architectural dome in ancient redwood grove with outdoor cedar soaking tub and stargazing skylight.",
    imageSrc: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    category: "Camping",
    roomCount: 1,
    bathroomCount: 1,
    guestCount: 3,
    price: 145,
    country: "United States",
    region: "Americas",
    latlng: [38, -97],
  },
  {
    title: "Wadi Rum Starlight Desert Camp",
    description: "Luxury safari glamping tents surrounded by towering red sandstone cliffs and unmatched desert dark skies.",
    imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    category: "Camping",
    roomCount: 1,
    bathroomCount: 1,
    guestCount: 2,
    price: 160,
    country: "Jordan",
    region: "Asia",
    latlng: [31, 36],
  },

  // --- Arctic ---
  {
    title: "Lofoten Aurora Glass Cabin",
    description: "Geodesic glass lodge on the water's edge, custom-designed for watching the Aurora Borealis from bed.",
    imageSrc: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80",
    category: "Arctic",
    roomCount: 1,
    bathroomCount: 1,
    guestCount: 2,
    price: 310,
    country: "Norway",
    region: "Europe",
    latlng: [62, 10],
  },
  {
    title: "Lapland Heated Igloo Resort",
    description: "Thermal glass igloo nestled in snowy pine wilderness with private wood-fired sauna and reindeer excursions.",
    imageSrc: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    category: "Arctic",
    roomCount: 1,
    bathroomCount: 1,
    guestCount: 2,
    price: 340,
    country: "Finland",
    region: "Europe",
    latlng: [64, 26],
  },

  // --- Desert ---
  {
    title: "Marrakech Royal Palm Oasis Palace",
    description: "Authentic riad palace with mosaic courtyard, central plunge pool, rooftop cocktail terrace, and hammam.",
    imageSrc: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    category: "Desert",
    roomCount: 4,
    bathroomCount: 4,
    guestCount: 8,
    price: 260,
    country: "Morocco",
    region: "Africa",
    latlng: [32, -5],
  },
  {
    title: "Joshua Tree Mirror Desert Oasis",
    description: "Architectural wonder that mirrors the desert horizon, featuring outdoor fire pit and stargazing hot tub.",
    imageSrc: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    category: "Desert",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    price: 350,
    country: "United States",
    region: "Americas",
    latlng: [38, -97],
  },

  // --- Barns ---
  {
    title: "Cotswolds Converted Oak Timber Barn",
    description: "Chic modern barn conversion with vaulted cathedral ceilings, wood-burning stove, and wildflower meadow pastures.",
    imageSrc: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    category: "Barns",
    roomCount: 3,
    bathroomCount: 2,
    guestCount: 6,
    price: 240,
    country: "United Kingdom",
    region: "Europe",
    latlng: [54, -2],
  },
  {
    title: "Vermont Scandinavian Timber Barn",
    description: "Black timber designer barn set on 20 private rolling acres with warm minimalist interior and wood sauna.",
    imageSrc: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80",
    category: "Barns",
    roomCount: 4,
    bathroomCount: 3,
    guestCount: 8,
    price: 275,
    country: "United States",
    region: "Americas",
    latlng: [38, -97],
  },
];

async function main() {
  const email = "vanjali73537@gmail.com";
  const password = "12345678";

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 12);
    user = await prisma.user.create({
      data: {
        email,
        name: "Admin",
        password: hashedPassword,
      },
    });
    console.log("Created admin user:", user.email);
  } else {
    console.log("Admin user exists:", user.email);
  }

  // Clear existing sample listings to avoid duplicates and repopulate cleanly
  await prisma.listing.deleteMany({});
  console.log("Cleaned old listings.");

  console.log("Seeding comprehensive listings for ALL 15 categories...");
  for (const listing of allCategoryListings) {
    await prisma.listing.create({
      data: {
        ...listing,
        userId: user.id,
      },
    });
  }
  console.log(`Successfully seeded ${allCategoryListings.length} listings covering all 15 categories!`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

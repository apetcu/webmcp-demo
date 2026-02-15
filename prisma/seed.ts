import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  // Electronics
  {
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation and 30-hour battery life. Features Bluetooth 5.3 connectivity and memory foam ear cushions for all-day comfort.",
    price: 249.99,
    image: "https://picsum.photos/seed/headphones/800/800",
    category: "Electronics",
    inStock: true,
  },
  {
    name: "Ultra-Slim Mechanical Keyboard",
    description:
      "Low-profile mechanical keyboard with hot-swappable switches and RGB backlighting. Machined aluminum frame with a compact 75% layout perfect for desk setups.",
    price: 149.99,
    image: "https://picsum.photos/seed/keyboard/800/800",
    category: "Electronics",
    inStock: true,
  },
  {
    name: "4K Webcam Pro",
    description:
      "Ultra HD webcam with auto-focus and built-in ring light for crystal-clear video calls. Features a wide-angle lens and AI-powered background blur for a professional look.",
    price: 129.99,
    image: "https://picsum.photos/seed/webcam/800/800",
    category: "Electronics",
    inStock: true,
  },
  {
    name: "Portable Bluetooth Speaker",
    description:
      "Waterproof portable speaker with 360-degree sound and 20-hour battery life. Rugged design rated IP67 for outdoor adventures, with deep bass and crisp highs.",
    price: 79.99,
    image: "https://picsum.photos/seed/speaker/800/800",
    category: "Electronics",
    inStock: true,
  },
  {
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, and sleep analysis. AMOLED always-on display with 7-day battery life and 100+ workout modes.",
    price: 199.99,
    image: "https://picsum.photos/seed/smartwatch/800/800",
    category: "Electronics",
    inStock: false,
  },

  // Clothing
  {
    name: "Merino Wool Crew Neck Sweater",
    description:
      "Ultra-soft 100% merino wool sweater with a relaxed fit and ribbed cuffs. Naturally temperature-regulating and odor-resistant, perfect for layering in any season.",
    price: 89.99,
    image: "https://picsum.photos/seed/sweater/800/800",
    category: "Clothing",
    inStock: true,
  },
  {
    name: "Slim Fit Chino Pants",
    description:
      "Classic stretch chino pants with a modern slim fit and tapered leg. Made from premium organic cotton twill with a comfortable mid-rise waist.",
    price: 64.99,
    image: "https://picsum.photos/seed/chinos/800/800",
    category: "Clothing",
    inStock: true,
  },
  {
    name: "Lightweight Down Jacket",
    description:
      "Packable puffer jacket filled with responsibly sourced 700-fill-power down. Weighs under 10 ounces and packs into its own pocket for easy travel.",
    price: 159.99,
    image: "https://picsum.photos/seed/jacket/800/800",
    category: "Clothing",
    inStock: true,
  },
  {
    name: "Organic Cotton Graphic Tee",
    description:
      "Soft ringspun organic cotton t-shirt with a vintage-inspired graphic print. Pre-shrunk fabric with reinforced shoulder seams for lasting durability.",
    price: 34.99,
    image: "https://picsum.photos/seed/tshirt/800/800",
    category: "Clothing",
    inStock: true,
  },

  // Home & Kitchen
  {
    name: "Pour-Over Coffee Maker Set",
    description:
      "Hand-blown borosilicate glass pour-over dripper with reusable stainless steel filter. Includes a thermal carafe that keeps coffee hot for hours without a hot plate.",
    price: 54.99,
    image: "https://picsum.photos/seed/coffee/800/800",
    category: "Home & Kitchen",
    inStock: true,
  },
  {
    name: "Cast Iron Dutch Oven",
    description:
      "Enameled cast iron dutch oven with a 6-quart capacity and self-basting lid. Even heat distribution makes it perfect for braising, baking bread, and slow-cooking stews.",
    price: 119.99,
    image: "https://picsum.photos/seed/dutchoven/800/800",
    category: "Home & Kitchen",
    inStock: true,
  },
  {
    name: "Bamboo Cutting Board Set",
    description:
      "Set of three organic bamboo cutting boards in graduated sizes with juice grooves. Naturally antimicrobial and knife-friendly, with non-slip silicone feet.",
    price: 39.99,
    image: "https://picsum.photos/seed/cuttingboard/800/800",
    category: "Home & Kitchen",
    inStock: true,
  },
  {
    name: "Smart LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with five color temperature modes and auto-dimming sensor. Features a built-in wireless charging pad and USB port for device charging.",
    price: 69.99,
    image: "https://picsum.photos/seed/desklamp/800/800",
    category: "Home & Kitchen",
    inStock: true,
  },
  {
    name: "Ceramic Plant Pot Collection",
    description:
      "Set of four handcrafted ceramic planters in matte earth tones with drainage holes and saucers. Modern minimalist design that complements any interior style.",
    price: 44.99,
    image: "https://picsum.photos/seed/plantpots/800/800",
    category: "Home & Kitchen",
    inStock: false,
  },

  // Accessories
  {
    name: "Leather Minimalist Wallet",
    description:
      "Slim bifold wallet crafted from full-grain Italian leather with RFID-blocking technology. Holds up to 8 cards and cash with a sleek profile that fits comfortably in any pocket.",
    price: 59.99,
    image: "https://picsum.photos/seed/wallet/800/800",
    category: "Accessories",
    inStock: true,
  },
  {
    name: "Polarized Aviator Sunglasses",
    description:
      "Classic aviator sunglasses with polarized lenses and lightweight titanium frames. UV400 protection with anti-scratch and anti-reflective coatings for superior clarity.",
    price: 89.99,
    image: "https://picsum.photos/seed/sunglasses/800/800",
    category: "Accessories",
    inStock: true,
  },
  {
    name: "Canvas Weekender Bag",
    description:
      "Waxed canvas duffel bag with leather handles and a detachable shoulder strap. Spacious interior with a shoe compartment and multiple organizer pockets for weekend getaways.",
    price: 109.99,
    image: "https://picsum.photos/seed/weekender/800/800",
    category: "Accessories",
    inStock: true,
  },
  {
    name: "Automatic Stainless Steel Watch",
    description:
      "Japanese automatic movement watch with a sapphire crystal face and exhibition caseback. Water-resistant to 100 meters with a brushed stainless steel bracelet.",
    price: 279.99,
    image: "https://picsum.photos/seed/watch/800/800",
    category: "Accessories",
    inStock: true,
  },

  // Sports
  {
    name: "Non-Slip Yoga Mat",
    description:
      "Extra-thick 6mm yoga mat made from eco-friendly natural rubber with a microfiber surface. Superior grip even during hot yoga, with alignment markings for proper form.",
    price: 68.99,
    image: "https://picsum.photos/seed/yogamat/800/800",
    category: "Sports",
    inStock: true,
  },
  {
    name: "Adjustable Dumbbell Set",
    description:
      "Space-saving adjustable dumbbells that replace 15 sets of weights, ranging from 5 to 52.5 lbs each. Quick-change dial system lets you switch weights in seconds.",
    price: 349.99,
    image: "https://picsum.photos/seed/dumbbells/800/800",
    category: "Sports",
    inStock: true,
  },
  {
    name: "Insulated Water Bottle",
    description:
      "Triple-wall vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12. Made from BPA-free stainless steel with a leak-proof sport cap.",
    price: 34.99,
    image: "https://picsum.photos/seed/waterbottle/800/800",
    category: "Sports",
    inStock: true,
  },
  {
    name: "Resistance Band Training Kit",
    description:
      "Complete set of five fabric resistance bands with varying tension levels for full-body workouts. Includes a travel pouch and illustrated exercise guide with 40+ exercises.",
    price: 29.99,
    image: "https://picsum.photos/seed/resistancebands/800/800",
    category: "Sports",
    inStock: true,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing products
  const deleted = await prisma.product.deleteMany();
  console.log(`Deleted ${deleted.count} existing products.`);

  // Create new products
  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${created.name}`);
  }

  console.log(`\nSeeded ${products.length} products successfully.`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

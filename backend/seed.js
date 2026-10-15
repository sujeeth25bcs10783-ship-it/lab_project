require("dotenv").config();
const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const mongoose = require("mongoose");
const Product = require("./models/product.model");

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1:27017/shopkart";

const sampleProducts = [
  // 1. Electronics
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation with dual processors, 8 microphones, and ultra-comfortable lightweight design with 30-hour battery life.",
    price: 26990,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    stock: 15,
  },
  {
    name: "Apple Watch Ultra 2 Titanium",
    description: "Rugged 49mm aerospace-grade titanium case, precision dual-frequency GPS, cellular connectivity, and up to 72 hours of battery life.",
    price: 89900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    stock: 8,
  },
  {
    name: "Fujifilm X100V Mirrorless Digital Camera",
    description: "Iconic timeless body with a sharp 23mm F2 lens, hybrid optical/electronic viewfinder, and cinematic color film simulations.",
    price: 139999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    stock: 4,
  },
  {
    name: "Keychron Q1 Pro Custom Mechanical Keyboard",
    description: "Full CNC aluminum body, double-gasket acoustic dampening, hot-swappable tactile switches, and wireless Bluetooth 5.1 connectivity.",
    price: 17499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    stock: 20,
  },

  // 2. Fashion
  {
    name: "Minimalist Heavyweight French Terry Hoodie",
    description: "500 GSM organic loopback cotton, relaxed boxy silhouette with double-lined hood and zero exterior branding for an understated luxury feel.",
    price: 3499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    stock: 25,
  },
  {
    name: "Raw Selvedge Denim Jacket in Deep Indigo",
    description: "14.5oz Japanese shuttle-loom denim with custom antiqued brass hardware, contrast stitching, and authentic red-line selvedge ID.",
    price: 5999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    stock: 12,
  },
  {
    name: "Urban Waterproof Utility Trench Coat",
    description: "Fully taped seams, magnetic storm flaps, breathable 3-layer technical membrane, and concealed quick-access passport pockets.",
    price: 8499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    stock: 9,
  },
  {
    name: "Full-Grain Leather Chelsea Boots",
    description: "Handcrafted Italian calfskin leather with Goodyear welted Dainite rubber soles, supple leather lining, and elastic side gussets.",
    price: 7299,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80",
    stock: 14,
  },

  // 3. Home
  {
    name: "Aarke Carbonator 3 Sparkling Water Maker",
    description: "Seamless stainless-steel precision engineering with a sleek matte finish and satisfying lever-operated carbonation system.",
    price: 21990,
    category: "Home",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    stock: 10,
  },
  {
    name: "Ceramic Pour-Over Coffee Dripper Set",
    description: "Artisan stoneware dripper with heat-resistant borosilicate glass carafe and handcrafted wooden insulation collar.",
    price: 2799,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    stock: 30,
  },
  {
    name: "Minimalist Bauhaus Desk Lamp",
    description: "Architectural solid brass arm with 3-step capacitive touch dimming and glare-free warm 3000K high-CRI LED illumination.",
    price: 4499,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    stock: 16,
  },
  {
    name: "Hand-Poured Soy Wax Botanical Candle",
    description: "Natural soy wax infused with notes of cedarwood, amber, and crisp bergamot in an amber apothecary jar with a crackling wooden wick.",
    price: 1499,
    category: "Home",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80",
    stock: 40,
  },

  // 4. Books
  {
    name: "Designing Data-Intensive Applications",
    description: "The definitive guide by Martin Kleppmann exploring architecture, storage engines, distributed consensus, and reliability in modern software.",
    price: 1899,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    stock: 18,
  },
  {
    name: "The Design of Everyday Things by Don Norman",
    description: "Cognitive psychology meets product design. Learn affordances, signifiers, feedback loops, and why intuitive design matters.",
    price: 799,
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
    stock: 22,
  },
  {
    name: "Monocle Guide to Better Living (Hardcover)",
    description: "A richly illustrated global survey of architecture, boutique hospitality, industrial craft, and intentional urban living.",
    price: 4299,
    category: "Books",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
    stock: 7,
  },
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected successfully!");

    console.log("Inserting curated catalog products...");
    const created = await Product.insertMany(sampleProducts);
    console.log(`Successfully added ${created.length} products to the catalog!`);

    const count = await Product.countDocuments();
    console.log(`Total products currently in catalog: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();

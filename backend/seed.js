const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => console.log('MongoDB connection error:', err));

// Sample categories
const categories = [
  { name: 'Rings', slug: 'rings', description: 'Beautiful rings for every occasion' },
  { name: 'Earrings', slug: 'earrings', description: 'Elegant earrings to complement your style' },
  { name: 'Necklaces', slug: 'necklaces', description: 'Stunning necklaces to enhance your beauty' },
  { name: 'Bracelets', slug: 'bracelets', description: 'Charming bracelets for your wrist' }
];

// Sample products
const products = [
  {
    name: "Pink Heart Ring",
    slug: "pink-heart-ring",
    description: "A delicate pink heart ring perfect for expressing love and affection. Crafted with precision and care.",
    shortDescription: "Delicate pink heart ring",
    price: 1800,
    comparePrice: 2200,
    images: ["/images/pink-heart.jpg"],
    category: "rings",
    brand: "Trinkets",
    material: "Silver",
    gemstone: "Other",
    weight: 2.5,
    weightUnit: "grams",
    size: "7",
    color: "pink",
    style: "Elegant",
    occasion: "Everyday",
    stock: 15,
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    metaTitle: "Pink Heart Ring - Trinkets",
    metaDescription: "Beautiful pink heart ring perfect for expressing love",
    tags: ["heart", "pink", "romantic", "ring"]
  },
  {
    name: "Purple Stone Ring",
    description: "An elegant purple stone ring that adds a touch of sophistication to any outfit.",
    shortDescription: "Elegant purple stone ring",
    price: 1200,
    comparePrice: 1500,
    images: ["/images/purple-ring-cat.jpg"],
    category: "rings",
    brand: "Trinkets",
    material: "Silver",
    gemstone: "Amethyst",
    weight: 3.2,
    weightUnit: "grams",
    size: "7",
    color: "purple",
    style: "Elegant",
    occasion: "Special Occasion",
    stock: 12,
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    metaTitle: "Purple Stone Ring - Trinkets",
    metaDescription: "Elegant purple stone ring for formal occasions",
    tags: ["purple", "stone", "elegant", "ring"]
  },
  {
    name: "Gold Ring",
    description: "A classic gold ring that never goes out of style. Perfect for everyday wear.",
    shortDescription: "Classic gold ring",
    price: 3500,
    comparePrice: 4000,
    images: ["/images/gold-ring.jpg"],
    category: "rings",
    brand: "Trinkets",
    material: "Gold",
    gemstone: "None",
    weight: 4.8,
    weightUnit: "grams",
    size: "7",
    color: "gold",
    style: "Classic",
    occasion: "Everyday",
    stock: 8,
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    metaTitle: "Gold Ring - Trinkets",
    metaDescription: "Classic gold ring for everyday wear",
    tags: ["gold", "classic", "everyday", "ring"]
  },
  {
    name: "Pearl Drop Earrings",
    description: "Timeless pearl drop earrings that add elegance to any ensemble.",
    shortDescription: "Timeless pearl drop earrings",
    price: 1200,
    comparePrice: 1400,
    images: ["/images/pearl-drop-earrings.jpg"],
    category: "earrings",
    brand: "Trinkets",
    material: "Silver",
    gemstone: "Pearl",
    weight: 1.8,
    weightUnit: "grams",
    size: "standard",
    color: "white",
    style: "Elegant",
    occasion: "Special Occasion",
    stock: 20,
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    metaTitle: "Pearl Drop Earrings - Trinkets",
    metaDescription: "Timeless pearl drop earrings for formal occasions",
    tags: ["pearl", "drop", "timeless", "earrings"]
  },
  {
    name: "Flower Earring",
    description: "Delicate flower earrings that bring a touch of nature to your style.",
    shortDescription: "Delicate flower earrings",
    price: 950,
    comparePrice: 1100,
    images: ["/images/flower-earring.jpg"],
    category: "earrings",
    brand: "Trinkets",
    material: "Silver",
    gemstone: "Other",
    weight: 1.2,
    weightUnit: "grams",
    size: "standard",
    color: "silver",
    style: "Modern",
    occasion: "Everyday",
    stock: 18,
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    metaTitle: "Flower Earring - Trinkets",
    metaDescription: "Delicate flower earrings with crystal details",
    tags: ["flower", "crystal", "nature", "earrings"]
  },
  {
    name: "Pearl Loop Earring",
    description: "Elegant pearl loop earrings that frame your face beautifully.",
    shortDescription: "Elegant pearl loop earrings",
    price: 1100,
    comparePrice: 1300,
    images: ["/images/pearl-loop-earring.jpg"],
    category: "earrings",
    brand: "Trinkets",
    material: "Silver",
    gemstone: "Pearl",
    weight: 2.1,
    weightUnit: "grams",
    size: "standard",
    color: "white",
    style: "Elegant",
    occasion: "Everyday",
    stock: 16,
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    metaTitle: "Pearl Loop Earring - Trinkets",
    metaDescription: "Elegant pearl loop earrings for casual wear",
    tags: ["pearl", "loop", "elegant", "earrings"]
  },
  {
    name: "Flower Necklace",
    description: "A beautiful flower necklace that adds a feminine touch to any outfit.",
    shortDescription: "Beautiful flower necklace",
    price: 1600,
    comparePrice: 1800,
    images: ["/images/flower-necklace.jpg"],
    category: "necklaces",
    brand: "Trinkets",
    material: "Silver",
    gemstone: "Other",
    weight: 5.2,
    weightUnit: "grams",
    size: "18\"",
    color: "silver",
    style: "Modern",
    occasion: "Everyday",
    stock: 14,
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    metaTitle: "Flower Necklace - Trinkets",
    metaDescription: "Beautiful flower necklace with crystal details",
    tags: ["flower", "crystal", "feminine", "necklace"]
  },
  {
    name: "Silver Stud Necklace",
    description: "A simple yet elegant silver stud necklace perfect for everyday wear.",
    shortDescription: "Simple silver stud necklace",
    price: 1400,
    comparePrice: 1600,
    images: ["/images/silver-stud-necklace.jpg"],
    category: "necklaces",
    brand: "Trinkets",
    material: "Silver",
    gemstone: "Other",
    weight: 3.8,
    weightUnit: "grams",
    size: "18\"",
    color: "silver",
    style: "Minimalist",
    occasion: "Everyday",
    stock: 22,
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    metaTitle: "Silver Stud Necklace - Trinkets",
    metaDescription: "Simple silver stud necklace for everyday wear",
    tags: ["silver", "stud", "minimalist", "necklace"]
  },
  {
    name: "Diamond Necklace",
    description: "A stunning diamond necklace that makes a statement at any special occasion.",
    shortDescription: "Stunning diamond necklace",
    price: 4500,
    comparePrice: 5000,
    images: ["/images/diamond-necklace.jpg"],
    category: "necklaces",
    brand: "Trinkets",
    material: "White Gold",
    gemstone: "Diamond",
    weight: 8.5,
    weightUnit: "grams",
    size: "18\"",
    color: "white",
    style: "Bold",
    occasion: "Special Occasion",
    stock: 6,
    isActive: true,
    isFeatured: true,
    isOnSale: false,
    metaTitle: "Diamond Necklace - Trinkets",
    metaDescription: "Stunning diamond necklace for special occasions",
    tags: ["diamond", "luxury", "formal", "necklace"]
  },
  {
    name: "Gold Chain Bracelet",
    description: "A classic gold chain bracelet that adds sophistication to your wrist.",
    shortDescription: "Classic gold chain bracelet",
    price: 2800,
    comparePrice: 3200,
    images: ["/images/gold-chain-bracelet.jpg"],
    category: "bracelets",
    brand: "Trinkets",
    material: "Gold",
    gemstone: "None",
    weight: 6.2,
    weightUnit: "grams",
    size: "7\"",
    color: "gold",
    style: "Classic",
    occasion: "Everyday",
    stock: 10,
    isActive: true,
    isFeatured: false,
    isOnSale: true,
    metaTitle: "Gold Chain Bracelet - Trinkets",
    metaDescription: "Classic gold chain bracelet for everyday wear",
    tags: ["gold", "chain", "classic", "bracelet"]
  },
  {
    name: "Beaded Bracelet",
    description: "A colorful beaded bracelet that adds a playful touch to your style.",
    shortDescription: "Colorful beaded bracelet",
    price: 850,
    comparePrice: 1000,
    images: ["/images/beaded-bracelet.jpg"],
    category: "bracelets",
    brand: "Trinkets",
    material: "Other",
    gemstone: "Other",
    weight: 1.5,
    weightUnit: "grams",
    size: "7\"",
    color: "multicolor",
    style: "Modern",
    occasion: "Everyday",
    stock: 25,
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    metaTitle: "Beaded Bracelet - Trinkets",
    metaDescription: "Colorful beaded bracelet for casual wear",
    tags: ["beaded", "colorful", "playful", "bracelet"]
  },
  {
    name: "Heart Bracelet",
    description: "A charming heart bracelet that symbolizes love and friendship.",
    shortDescription: "Charming heart bracelet",
    price: 1300,
    comparePrice: 1500,
    images: ["/images/heart-bracelet.jpg"],
    category: "bracelets",
    brand: "Trinkets",
    material: "Silver",
    gemstone: "Other",
    weight: 2.8,
    weightUnit: "grams",
    size: "7\"",
    color: "silver",
    style: "Elegant",
    occasion: "Everyday",
    stock: 18,
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    metaTitle: "Heart Bracelet - Trinkets",
    metaDescription: "Charming heart bracelet symbolizing love",
    tags: ["heart", "crystal", "romantic", "bracelet"]
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories created:', createdCategories.length);

    // Create a map of category slugs to ObjectIds
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Add category ObjectIds, slugs, and SKUs to products
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      category: categoryMap[product.category],
      slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku: `${product.name.substring(0, 3).toUpperCase()}${Date.now().toString().slice(-6)}${index}`
    }));

    // Create products
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log('Products created:', createdProducts.length);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 
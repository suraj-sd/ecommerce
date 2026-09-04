import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../src/config/env.js";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  {
    name: "Electronics",
    products: [
      {
        name: "Wireless Headphones",
        description: "Bluetooth wireless headphones with noise cancellation",
        price: 79.99,
        stock: 50,
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with powerful sound",
        price: 49.99,
        stock: 75,
      },
      {
        name: "Smart Watch",
        description: "Smart watch with fitness and health tracking",
        price: 129.99,
        stock: 40,
      },
      {
        name: "Wireless Keyboard",
        description: "Slim wireless keyboard for desktop and laptop",
        price: 39.99,
        stock: 60,
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with adjustable DPI",
        price: 24.99,
        stock: 100,
      },
      {
        name: "USB-C Hub",
        description: "Multi-port USB-C hub with HDMI and USB ports",
        price: 34.99,
        stock: 80,
      },
      {
        name: "Power Bank",
        description: "20000mAh fast charging portable power bank",
        price: 44.99,
        stock: 90,
      },
      {
        name: "Webcam",
        description: "Full HD webcam for video calls and streaming",
        price: 59.99,
        stock: 45,
      },
      {
        name: "Gaming Headset",
        description: "Gaming headset with surround sound microphone",
        price: 89.99,
        stock: 35,
      },
      {
        name: "LED Monitor",
        description: "24-inch Full HD LED monitor",
        price: 179.99,
        stock: 25,
      },
    ],
  },

  {
    name: "Smartphones",
    products: [
      {
        name: "Apple iPhone 15",
        description: "Apple smartphone with advanced camera system",
        price: 799.99,
        stock: 30,
      },
      {
        name: "Apple iPhone 15 Pro",
        description: "Premium Apple smartphone with Pro features",
        price: 999.99,
        stock: 20,
      },
      {
        name: "Samsung Galaxy S24",
        description: "Samsung flagship smartphone with AMOLED display",
        price: 849.99,
        stock: 35,
      },
      {
        name: "Samsung Galaxy A55",
        description: "Mid-range Samsung smartphone with great battery life",
        price: 399.99,
        stock: 50,
      },
      {
        name: "Google Pixel 8",
        description: "Google smartphone with advanced AI camera",
        price: 699.99,
        stock: 25,
      },
      {
        name: "OnePlus 12",
        description: "High-performance smartphone with fast charging",
        price: 749.99,
        stock: 30,
      },
      {
        name: "OnePlus Nord CE",
        description: "Affordable smartphone with smooth performance",
        price: 299.99,
        stock: 55,
      },
      {
        name: "Xiaomi Redmi Note 13",
        description: "Budget smartphone with high-resolution display",
        price: 249.99,
        stock: 70,
      },
      {
        name: "Motorola Edge 50",
        description: "Modern smartphone with curved OLED display",
        price: 499.99,
        stock: 40,
      },
      {
        name: "Nothing Phone",
        description: "Unique smartphone with transparent-inspired design",
        price: 599.99,
        stock: 30,
      },
    ],
  },

  {
    name: "Laptops",
    products: [
      {
        name: "MacBook Air M3",
        description: "Lightweight Apple laptop powered by M3 chip",
        price: 1099.99,
        stock: 15,
      },
      {
        name: "MacBook Pro 14",
        description:
          "Professional Apple laptop with high-performance processor",
        price: 1799.99,
        stock: 10,
      },
      {
        name: "Dell Inspiron 15",
        description: "Everyday laptop for work and study",
        price: 649.99,
        stock: 25,
      },
      {
        name: "Dell XPS 13",
        description: "Premium compact laptop with high-resolution display",
        price: 1199.99,
        stock: 12,
      },
      {
        name: "HP Pavilion 15",
        description: "Versatile laptop for home and office use",
        price: 699.99,
        stock: 30,
      },
      {
        name: "HP Envy x360",
        description: "Convertible touchscreen laptop",
        price: 899.99,
        stock: 18,
      },
      {
        name: "Lenovo ThinkPad E14",
        description: "Business laptop with durable design",
        price: 749.99,
        stock: 20,
      },
      {
        name: "Lenovo IdeaPad 5",
        description: "Affordable laptop for productivity and entertainment",
        price: 599.99,
        stock: 35,
      },
      {
        name: "ASUS VivoBook 15",
        description: "Slim laptop designed for everyday productivity",
        price: 629.99,
        stock: 28,
      },
      {
        name: "Acer Aspire 5",
        description: "Budget-friendly laptop for students and professionals",
        price: 549.99,
        stock: 40,
      },
    ],
  },

  {
    name: "Home Appliances",
    products: [
      {
        name: "Microwave Oven",
        description: "Compact microwave oven for quick cooking",
        price: 149.99,
        stock: 25,
      },
      {
        name: "Electric Kettle",
        description: "Fast boiling electric kettle with auto shut-off",
        price: 39.99,
        stock: 60,
      },
      {
        name: "Air Fryer",
        description: "Digital air fryer for healthy cooking",
        price: 99.99,
        stock: 35,
      },
      {
        name: "Coffee Maker",
        description: "Automatic coffee maker for home use",
        price: 79.99,
        stock: 40,
      },
      {
        name: "Toaster",
        description: "Two-slice toaster with multiple browning settings",
        price: 29.99,
        stock: 70,
      },
      {
        name: "Blender",
        description: "High-speed kitchen blender",
        price: 69.99,
        stock: 45,
      },
      {
        name: "Rice Cooker",
        description: "Automatic rice cooker with keep-warm function",
        price: 59.99,
        stock: 50,
      },
      {
        name: "Vacuum Cleaner",
        description: "Powerful vacuum cleaner for home cleaning",
        price: 129.99,
        stock: 30,
      },
      {
        name: "Room Heater",
        description: "Portable electric room heater",
        price: 89.99,
        stock: 25,
      },
      {
        name: "Air Purifier",
        description: "HEPA air purifier for indoor environments",
        price: 199.99,
        stock: 20,
      },
    ],
  },

  {
    name: "Clothing",
    products: [
      {
        name: "Cotton T-Shirt",
        description: "Comfortable 100 percent cotton casual T-shirt",
        price: 19.99,
        stock: 100,
      },
      {
        name: "Denim Jeans",
        description: "Classic regular-fit denim jeans",
        price: 49.99,
        stock: 80,
      },
      {
        name: "Hoodie",
        description: "Warm fleece hoodie for casual wear",
        price: 39.99,
        stock: 70,
      },
      {
        name: "Formal Shirt",
        description: "Classic formal shirt for office and business wear",
        price: 34.99,
        stock: 65,
      },
      {
        name: "Chino Pants",
        description: "Slim-fit cotton chino pants",
        price: 44.99,
        stock: 55,
      },
      {
        name: "Leather Jacket",
        description: "Stylish premium leather jacket",
        price: 149.99,
        stock: 20,
      },
      {
        name: "Winter Sweater",
        description: "Soft knitted sweater for winter",
        price: 54.99,
        stock: 45,
      },
      {
        name: "Polo Shirt",
        description: "Classic cotton polo shirt",
        price: 29.99,
        stock: 75,
      },
      {
        name: "Cargo Pants",
        description: "Comfortable multi-pocket cargo pants",
        price: 49.99,
        stock: 60,
      },
      {
        name: "Rain Jacket",
        description: "Water-resistant lightweight rain jacket",
        price: 69.99,
        stock: 35,
      },
    ],
  },

  {
    name: "Footwear",
    products: [
      {
        name: "Running Shoes",
        description: "Lightweight shoes designed for running",
        price: 89.99,
        stock: 60,
      },
      {
        name: "Casual Sneakers",
        description: "Comfortable everyday sneakers",
        price: 69.99,
        stock: 80,
      },
      {
        name: "Formal Shoes",
        description: "Classic leather formal shoes",
        price: 99.99,
        stock: 40,
      },
      {
        name: "Hiking Boots",
        description: "Durable boots for hiking and outdoor activities",
        price: 129.99,
        stock: 30,
      },
      {
        name: "Sports Shoes",
        description: "Comfortable sports shoes for training",
        price: 79.99,
        stock: 55,
      },
      {
        name: "Loafers",
        description: "Classic slip-on loafers",
        price: 74.99,
        stock: 45,
      },
      {
        name: "Flip Flops",
        description: "Lightweight casual flip flops",
        price: 14.99,
        stock: 100,
      },
      {
        name: "Leather Boots",
        description: "Premium leather boots for everyday use",
        price: 139.99,
        stock: 25,
      },
      {
        name: "Sandals",
        description: "Comfortable summer sandals",
        price: 34.99,
        stock: 75,
      },
      {
        name: "Football Shoes",
        description: "Grip-enhanced shoes for football players",
        price: 94.99,
        stock: 35,
      },
    ],
  },

  {
    name: "Books",
    products: [
      {
        name: "JavaScript Programming",
        description: "Complete guide to modern JavaScript programming",
        price: 39.99,
        stock: 50,
      },
      {
        name: "Node.js Development",
        description: "Learn backend development with Node.js",
        price: 44.99,
        stock: 45,
      },
      {
        name: "TypeScript Handbook",
        description: "Practical TypeScript programming guide",
        price: 42.99,
        stock: 40,
      },
      {
        name: "Database Design",
        description: "Introduction to relational database design",
        price: 49.99,
        stock: 35,
      },
      {
        name: "Clean Code",
        description: "Practical principles for writing maintainable software",
        price: 34.99,
        stock: 60,
      },
      {
        name: "Design Patterns",
        description: "Guide to common software design patterns",
        price: 54.99,
        stock: 30,
      },
      {
        name: "Web Development Guide",
        description: "Complete introduction to modern web development",
        price: 29.99,
        stock: 70,
      },
      {
        name: "Programming Algorithms",
        description: "Algorithms and problem-solving techniques",
        price: 59.99,
        stock: 25,
      },
      {
        name: "API Development",
        description: "Building scalable REST APIs",
        price: 39.99,
        stock: 40,
      },
      {
        name: "Software Engineering",
        description: "Fundamentals of modern software engineering",
        price: 49.99,
        stock: 35,
      },
    ],
  },

  {
    name: "Sports",
    products: [
      {
        name: "Football",
        description: "Professional size football",
        price: 29.99,
        stock: 80,
      },
      {
        name: "Basketball",
        description: "Official size basketball",
        price: 34.99,
        stock: 70,
      },
      {
        name: "Tennis Racket",
        description:
          "Lightweight tennis racket for beginners and professionals",
        price: 89.99,
        stock: 35,
      },
      {
        name: "Cricket Bat",
        description: "English willow cricket bat",
        price: 149.99,
        stock: 25,
      },
      {
        name: "Cricket Ball",
        description: "Leather cricket ball for competitive matches",
        price: 19.99,
        stock: 100,
      },
      {
        name: "Yoga Mat",
        description: "Non-slip exercise and yoga mat",
        price: 24.99,
        stock: 90,
      },
      {
        name: "Skipping Rope",
        description: "Adjustable skipping rope for fitness training",
        price: 12.99,
        stock: 120,
      },
      {
        name: "Dumbbell Set",
        description: "Adjustable dumbbell set for home workouts",
        price: 79.99,
        stock: 40,
      },
      {
        name: "Boxing Gloves",
        description: "Training boxing gloves with wrist support",
        price: 39.99,
        stock: 50,
      },
      {
        name: "Football Jersey",
        description: "Breathable sports jersey for football players",
        price: 44.99,
        stock: 60,
      },
    ],
  },

  {
    name: "Beauty",
    products: [
      {
        name: "Face Wash",
        description: "Gentle daily face cleanser",
        price: 12.99,
        stock: 100,
      },
      {
        name: "Moisturizer",
        description: "Daily moisturizing cream for skin",
        price: 19.99,
        stock: 80,
      },
      {
        name: "Sunscreen",
        description: "SPF protection sunscreen lotion",
        price: 17.99,
        stock: 90,
      },
      {
        name: "Shampoo",
        description: "Daily care shampoo for healthy hair",
        price: 14.99,
        stock: 100,
      },
      {
        name: "Conditioner",
        description: "Hair conditioner for smooth and soft hair",
        price: 15.99,
        stock: 85,
      },
      {
        name: "Lip Balm",
        description: "Moisturizing lip balm",
        price: 5.99,
        stock: 150,
      },
      {
        name: "Body Lotion",
        description: "Hydrating body lotion",
        price: 16.99,
        stock: 75,
      },
      {
        name: "Perfume",
        description: "Long-lasting fragrance for everyday use",
        price: 59.99,
        stock: 40,
      },
      {
        name: "Hair Dryer",
        description: "Professional hair dryer with multiple heat settings",
        price: 49.99,
        stock: 45,
      },
      {
        name: "Makeup Brush Set",
        description: "Professional makeup brush set",
        price: 29.99,
        stock: 55,
      },
    ],
  },

  {
    name: "Grocery",
    products: [
      {
        name: "Basmati Rice",
        description: "Premium long-grain basmati rice",
        price: 12.99,
        stock: 100,
      },
      {
        name: "Wheat Flour",
        description: "High-quality whole wheat flour",
        price: 8.99,
        stock: 120,
      },
      {
        name: "Organic Sugar",
        description: "Premium organic white sugar",
        price: 6.99,
        stock: 100,
      },
      {
        name: "Green Tea",
        description: "Premium green tea leaves",
        price: 9.99,
        stock: 80,
      },
      {
        name: "Coffee Beans",
        description: "Freshly roasted premium coffee beans",
        price: 14.99,
        stock: 70,
      },
      {
        name: "Olive Oil",
        description: "Extra virgin olive oil",
        price: 18.99,
        stock: 60,
      },
      {
        name: "Peanut Butter",
        description: "Creamy roasted peanut butter",
        price: 7.99,
        stock: 90,
      },
      {
        name: "Honey",
        description: "Natural pure honey",
        price: 11.99,
        stock: 75,
      },
      {
        name: "Oats",
        description: "Whole grain rolled oats",
        price: 5.99,
        stock: 110,
      },
      {
        name: "Mixed Nuts",
        description: "Premium mix of almonds, cashews and walnuts",
        price: 16.99,
        stock: 65,
      },
    ],
  },
];

async function main() {
  console.log("Starting database seed...");

  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: {
        name: categoryData.name,
      },
      update: {},
      create: {
        name: categoryData.name,
      },
    });

    console.log(`Category created/found: ${category.name}`);

    for (const productData of categoryData.products) {
      await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          stock: productData.stock,
          categoryId: category.id,
        },
      });
    }

    console.log(
      `Added ${categoryData.products.length} products to ${category.name}`,
    );
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

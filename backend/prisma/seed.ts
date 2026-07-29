import "dotenv/config";

import { PrismaClient, Prisma } from "../src/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {

  // Remove old products if you are testing
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Classic Dill Pickles",
        description:
          "Crisp, tangy and packed with classic dill flavour.",
        price: new Prisma.Decimal("8.99"),
        image:
          "https://seedtofork.com/wp-content/uploads/2025/01/6_dill2Bpickles.jpg",
        category: "Classic",
      },
      {
        name: "Spicy Pickles",
        description:
          "A bold, crunchy pickle with a satisfying chilli kick.",
        price: new Prisma.Decimal("9.99"),
        image:
          "https://www.allrecipes.com/thmb/hvCGIMKX24c_9d9dl7FLXUwi7KQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/4330449-pickled-garlic-jalapeno-peppers-photo-by-buckwheat-queen-edited-c2bbcb9e8bef4a06beeef9361bf927ac.jpg",
        category: "Spicy",
      },
      {
        name: "Bread & Butter Pickles",
        description:
          "Sweet, tangy and perfectly balanced.",
        price: new Prisma.Decimal("8.99"),
        image:
          "https://www.justataste.com/wp-content/uploads/2024/07/bread-and-butter-pickles.jpg",
        category: "Sweet",
      },
      {
        name: "Butter Pickles",
        description:
          "Sweet, tangy and perfectly balanced.",
        price: new Prisma.Decimal("9.99"),
        image:
          "https://images.getrecipekit.com/20241004131235-img_6187.jpg?aspect_ratio=16:9&quality=90&",
        category: "Sweet",
      },
    ],
  });

  console.log("✅ Products seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
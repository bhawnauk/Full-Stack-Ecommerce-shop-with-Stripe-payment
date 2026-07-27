import "dotenv/config";
import { PrismaClient } from "../src/generated/client";
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
  await prisma.product.createMany({
    data: [
      {
        name: "Classic Dill Pickles",
        description:
          "Crisp, tangy and packed with classic dill flavour.",
        price: 8.99,
        image: "YOUR_IMAGE_URL",
        category: "Classic",
      },
      {
        name: "Spicy Pickles",
        description:
          "A bold, crunchy pickle with a satisfying chilli kick.",
        price: 9.99,
        image: "YOUR_IMAGE_URL",
        category: "Spicy",
      },
      {
        name: "Bread & Butter Pickles",
        description:
          "Sweet, tangy and perfectly balanced.",
        price: 8.99,
        image: "YOUR_IMAGE_URL",
        category: "Sweet",
      },
    ],
  });

  console.log("Products seeded successfully");
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
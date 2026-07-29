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
          "https://picsum.photos/seed/classic-pickle/600/600",
        category: "Classic",
      },
      {
        name: "Spicy Pickles",
        description:
          "A bold, crunchy pickle with a satisfying chilli kick.",
        price: new Prisma.Decimal("9.99"),
        image:
          "https://picsum.photos/seed/spicy-pickle/600/600",
        category: "Spicy",
      },
      {
        name: "Bread & Butter Pickles",
        description:
          "Sweet, tangy and perfectly balanced.",
        price: new Prisma.Decimal("8.99"),
        image:
          "https://picsum.photos/seed/bread-butter-pickle/600/600",
        category: "Sweet",
      },
      {
        name: "Butter Pickles",
        description:
          "Sweet, tangy and perfectly balanced.",
        price: new Prisma.Decimal("9.99"),
        image:
          "https://picsum.photos/seed/butter-pickle/600/600",
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
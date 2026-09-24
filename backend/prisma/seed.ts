import "dotenv/config";
import bcrypt from "bcryptjs";
import { UserRole } from "../generated/prisma/index.js";
import { prisma } from "../src/libs/prisma.js";

const email = (process.env.SEED_ADMIN_EMAIL || "admin@example.com")
  .trim()
  .toLowerCase();
const password = process.env.SEED_ADMIN_PASSWORD || "AdminPassword123!";
const name = process.env.SEED_ADMIN_NAME || "Administrator";

const seed = async () => {
  if (password.length < 8) {
    throw new Error("SEED_ADMIN_PASSWORD must be at least 8 characters long");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  //   const user =
  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
    create: {
      name,
      email,
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  //   console.log(`Seeded admin user: ${user.email}`);
};

seed()
  .catch(() => {
    // console.error("Database seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

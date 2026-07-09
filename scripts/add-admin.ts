import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || "admin@collegeblink.com";
  const password = process.argv[3] || "admin12345";
  const name = process.argv[4] || "Administrator";

  console.log(`Creating Admin user...`);
  console.log(`Email: ${email}`);
  console.log(`Name: ${name}`);

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`User with email ${email} already exists! Updating role to ADMIN...`);
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: { role: "ADMIN" },
    });
    console.log(`Successfully updated user to ADMIN!`);
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "ADMIN",
      plan: "PRO",
    },
  });

  console.log(`Successfully created ADMIN user:`);
  console.log(`ID: ${user.id}`);
  console.log(`Email: ${user.email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

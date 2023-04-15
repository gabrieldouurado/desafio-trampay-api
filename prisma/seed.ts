import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('john@123', 8);

  const raw = {
    id: randomUUID(),
    name: 'John Due',
    email: 'johndue@email.com',
    password,
  };

  const mockUser = await prisma.user.create({
    data: raw,
  });

  console.log('User Created:', mockUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

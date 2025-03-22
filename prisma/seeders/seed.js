import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function pageOptionSeeder() {
  await prisma.pageOption.create({
    data: {
      title: 'Home Page',
    }
  })
  await prisma.pageOption.create({
    data: {
      title: 'Product Page',
    }
  })
  await prisma.pageOption.create({
    data: {
      title: 'All Pages',
    }
  })
}

pageOptionSeeder()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

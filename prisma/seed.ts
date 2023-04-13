import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function Seed() {
  const posts = [
    {
      slug: "to-new-seasons",
      date: new Date("2022-12-06"),
      title: "To New Seasons",
      series: "blog",
      categories: [
        "remix",
        "blog",
        "typescript",
        "prisma",
        "cockroachdb",
        "redis",
      ],
      markdown: "# To New Seasons",
      featured: false,
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log(`💽 prisma: database has been seeded. 🌱`);
}

Seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

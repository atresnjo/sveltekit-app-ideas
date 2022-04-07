import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  var artist = await prisma.artist.create({
    data: {
      name: 'Red Hot Chili Peppers'
    }
  });
  var song = await prisma.song.create({
    data: {
      artist: {
        connect: {
          id: artist.id
        }
      },
      name: 'Californication'
    }
  });
  var user = await prisma.user.create({
    data: {
      email: 'adnan.tresnjo@atresnjo.dev',
      password: 'foobar123456',
      username: 'atresnjo'
    }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      playlist: {
        create: {
          songId: song.id
        }
      }
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma } from '@/shared/prisma';

async function main() {
    const clubId = '873ccc78-25e2-43d3-a432-6a96f1e023d8';
  // 1️⃣ Создаём владельца клуба
//   const owner = await prisma.user.create({
//     data: {
//       telegramId: 'owner_telegram',
//       firstName: 'Owner',
//       canCreateClub: true,
//     },
//   });

  // 2️⃣ Создаём клуб
//   const club = await prisma.club.create({
//     data: {
//       name: 'Seed Club',
//       description: 'Клуб для тестирования',
//       isOpen: true,
//       ownerId: owner.id,
//     },
//   });

  // 3️⃣ Создаём участников
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        telegramId: `user${i}`,
        firstName: `User${i}`,
        canCreateClub: false,
      },
    });
    users.push(user);
  }

  // 4️⃣ Добавляем участников в Membership
  for (let i = 0; i < users.length; i++) {
    const role =
      i < 2 ? 'ADMIN' : i < 4 ? 'MEMBER' : 'MEMBER'; // первые 2 админы, остальные обычные
    await prisma.membership.create({
      data: {
        userId: users[i].id,
        clubId: clubId,
        role: role, // кастим к типу ClubRole
      },
    });
  }

  // 5️⃣ Добавляем 2 забаненных пользователей
  for (let i = 0; i < 2; i++) {
    await prisma.ban.create({
      data: {
        clubId: clubId,
        userId: users[i + 2].id, // берём пользователей, которые не админы
        reason: 'Test ban',
      },
    });
  }

  console.log('✅ Seed completed');
}


  main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


// npx tsx  src/shared/seed-scripts/add-users.js

import { prisma } from '@/shared/prisma';
import { UserFront } from '@/shared/model';

export async function getUserWithClubs(telegramId: string): Promise<UserFront | null> {
  const user = await prisma.user.findUnique({
    where: { telegramId },
    include: {
      ownedClub: true,
      memberships: {
        include: {
          club: true,
        },
      },
    },
  });


  if (!user) return null;

  const adminClubs = user.memberships
    .filter((m) => m.role === 'ADMIN')
    .map((m) => m.club);

  const memberClubs = user.memberships
    .filter((m) => m.role === 'MEMBER')
    .map((m) => m.club);

    const ownedClub = user.ownedClub ? { ...user.ownedClub } : null;

    return {
    ...user,
    ownedClub,
    memberships: {
      admin: adminClubs,
      member: memberClubs,
    },
  };
}

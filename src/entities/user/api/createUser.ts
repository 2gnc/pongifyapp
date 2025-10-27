import { prisma } from '@/shared/prisma';
import type { User as PrismaUser, Club as PrismaClub } from '@/generated/prisma';
import type { UserFrontT } from '@/entities/user';

export async function createUser(data: {
  telegramId: string;
  userName?: string;
  firstName?: string;
}): Promise<UserFrontT> {
  const created = await prisma.user.create({
    data: {
      ...data,
      canCreateClub: false,
    },
    include: { ownedClub: true },
  });

  return mapPrismaUserToUserFront(created);
}

function mapPrismaUserToUserFront(user: PrismaUser & { ownedClub?: PrismaClub | null }): UserFrontT {
  return {
    id: user.id,
    telegramId: user.telegramId,
    userName: user.userName ?? null,
    firstName: user.firstName ?? null,
    canCreateClub: user.canCreateClub,
    ownedClub: user.ownedClub
      ? {
          clubId: user.ownedClub.id,
          clubName: user.ownedClub.name,
        }
      : null,
    admin: [],
    member: [],
  };
}

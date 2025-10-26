import { prisma } from '@/shared/prisma';
import type { User as PrismaUser, Club as PrismaClub } from '@/generated/prisma';
import type { UserFront } from '@/shared/model';

export async function createUser(data: {
  telegramId: string;
  userName?: string;
  firstName?: string;
}): Promise<UserFront> {
  const created = await prisma.user.create({
    data: {
      ...data,
      canCreateClub: false,
    },
    include: { ownedClub: true },
  });

  return mapPrismaUserToUserFront(created);
}

function mapPrismaUserToUserFront(user: PrismaUser & { ownedClub?: PrismaClub | null }): UserFront {
  return {
    id: user.id,
    telegramId: user.telegramId,
    userName: user.userName ?? null,
    firstName: user.firstName ?? null,
    canCreateClub: user.canCreateClub,
    ownedClub: user.ownedClub
      ? {
          id: user.ownedClub.id,
          name: user.ownedClub.name,
          description: user.ownedClub.description,
          createdAt: user.ownedClub.createdAt,
          isOpen: user.ownedClub.isOpen,
          ownerId: user.ownedClub.ownerId,
        }
      : null,
    memberships: {
      admin: [],
      member: [],
    }
  };
}

import { prisma } from '@/shared/prisma';

export async function getUserWithOwnedClub(telegramId: string) {
  return prisma.user.findUnique({
    where: { telegramId },
    include: { ownedClub: true },
  });
}

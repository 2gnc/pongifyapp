import { prisma } from '@/shared/prisma';

export async function createUser(data: {
  telegramId: string;
  userName?: string;
  firstName?: string;
}) {
  return prisma.user.create({
    data: {
      ...data,
      canCreateClub: false,
    },
  });
}

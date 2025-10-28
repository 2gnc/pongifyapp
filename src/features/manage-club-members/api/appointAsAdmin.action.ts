'use server';

import { prisma } from '@/shared/prisma';

export async function appointMemberAsAdminAction(
    clubId: string,
    userId: string
): Promise<{ success: boolean }> {
  try {
    // 1️⃣ Проверяем, состоит ли пользователь уже в клубе
    const existingMembership = await prisma.membership.findUnique({
      where: {
        userId_clubId: {
            userId,
            clubId,
        },
      },
    });

    // 2️⃣ Если не состоит — добавляем как участника
    if (!existingMembership) {
      await prisma.membership.create({
        data: {
            userId,
            clubId,
            role: 'ADMIN',
        },
      });
      return { success: true };
    }

    // 3️⃣ Если состоит — обновляем роль
    if (existingMembership.role !== 'ADMIN') {
      await prisma.membership.update({
        where: {
          userId_clubId: {
                userId,
                clubId,
          },
        },
        data: {
            role: 'ADMIN',
        },
      });
    }

    return { success: true };
  } catch (e) {
    console.error('❌ appointMemberAsAdminAction error:', e);
    return { success: false };
  }
}

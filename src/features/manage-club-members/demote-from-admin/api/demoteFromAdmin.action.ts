'use server';

import { prisma } from '@/shared/prisma';

export async function demoteMemberFromAdminAction(clubId: string, userId: string): Promise<{ success: boolean }> {
    try {
        // проверяем, есть ли участник клуба
        const member = await prisma.membership.findFirst({
            where: { clubId, userId },
        });

        // если нет — выходим с ошибкой
        if (!member) {
            return { success: false };
        }

        // если он админ — снимаем роль
        if (member.role === 'ADMIN') {
            await prisma.membership.update({
                where: { id: member.id },
                data: { role: 'MEMBER' },
            });
        }

        return { success: true };
    } catch (e) {
        console.error('❌ demoteMemberFromAdminAction error:', e);
        return { success: false };
    }
}

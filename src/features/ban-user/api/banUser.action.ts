'use server'

import { prisma } from '@/shared/prisma';
import { ErrorCodeEnum } from '@/shared/errors/errorCodes';
import { banUserSchema } from '../model/schema';


export async function banUserAction(data: unknown): Promise<{ success: true }>
export async function banUserAction(data: unknown): Promise<{ success: false; error: ErrorCodeEnum }>
export async function banUserAction(data: unknown): Promise<{ success: true } | { success: false; error: ErrorCodeEnum }> {
    try {
        const pasedData = banUserSchema.parse(data);
        const { userId, clubId, reason, bannedById } = pasedData;

        const activeBan = await prisma.banHistory.findFirst({
            where: { userId, clubId, unbannedAt: null },
        });

        if (activeBan) {
            throw new Error('Пользователь уже забанен');
        }

        // Обновляем membership: помечаем как забаненного
        await prisma.membership.updateMany({
            where: { userId, clubId },
            data: { isBanned: true },
        });

        const banRecord = await prisma.banHistory.create({
            data: {
                userId,
                clubId,
                reason,
                bannedById,
            },
        });
    
        return { success: true }
    } catch(e) {
        console.error('❌ banUserAction error:', e);
        return { success: false, error: ErrorCodeEnum.INTERNAL }
    }
}

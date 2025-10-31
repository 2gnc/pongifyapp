'use server'

import { prisma } from '@/shared/prisma';
import { ErrorCodeEnum } from '@/shared/errors/errorCodes';
import { banUserSchema, BanUserT } from '../model/schema';


export async function banUserAction(data: BanUserT): Promise<{ success: true } | { success: false; error: ErrorCodeEnum }> {
    try {
        const pasedData = banUserSchema.parse(data);
        const { userId, clubId, reason, bannedById } = pasedData;

        const activeBan = await prisma.banHistory.findFirst({
            where: { userId, clubId, unbannedAt: null },
        });

        if (activeBan) {
            throw new Error('Пользователь уже забанен');
        }

        const userToBan = await prisma.user.findUnique({
            where: { id: userId },
            include: { ownedClub: true },
        });

        if (userToBan && userToBan.ownedClub?.id === clubId) {
            throw new Error('Нельзя банить владельца клуба');
        }

        await prisma.membership.updateMany({
            where: { userId, clubId },
            data: { isBanned: true },
        });

        await prisma.banHistory.create({
            data: {
                userId,
                clubId,
                reason,
                bannedById,
            },
        });
    
        return { success: true };
    } catch(e) {
        console.error('❌ banUserAction error:', e);
        return { success: false, error: ErrorCodeEnum.INTERNAL };
    }
}

export type BanUserResult = Awaited<ReturnType<typeof banUserAction>>;

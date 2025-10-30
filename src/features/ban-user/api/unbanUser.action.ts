'use server'

import { prisma } from '@/shared/prisma';
import { ErrorCodeEnum } from '@/shared/errors/errorCodes';
import { unbanUserSchema, UnbanUserT } from '../model/schema';

export async function unbanUserAction(data: UnbanUserT): Promise<{ success: true } | { success: false; error: ErrorCodeEnum }> {
    try {
        const parsedData = unbanUserSchema.parse(data);
        const { userId, clubId } = parsedData;

        const activeBan = await prisma.banHistory.findFirst({
            where: { userId, clubId, unbannedAt: null },
        });

        if (!activeBan) {
            throw new Error('Пользователь не забанен');
        }

        await prisma.membership.updateMany({
            where: { userId, clubId },
            data: { isBanned: false },
        });

        await prisma.banHistory.update({
            where: { id: activeBan.id },
            data: {
                unbannedAt: new Date(),
            },
        });
    
        return { success: true };
    } catch(e) {
        console.error('❌ unbanUserAction error:', e);
        return { success: false, error: ErrorCodeEnum.INTERNAL };
    }
}

export type UnbanUserResult = Awaited<ReturnType<typeof unbanUserAction>>;

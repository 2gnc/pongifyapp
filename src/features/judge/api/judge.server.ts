'use server'

import { getUserFromCookies } from "@/entities/user";
import { prisma } from "@/shared/prisma";
import { JudgeRuling, JudgeRulingRequest } from '../model/rulings';

export async function judgeAllows(
  request: JudgeRulingRequest
): Promise<boolean> {
    const user = await getUserFromCookies();

    if (!user) return false;

    const bdUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { ownedClub: true, memberships: true },
    });

    if (!bdUser) return false;

    switch (request.type) {
        case JudgeRuling.CAN_CREATE_CLUB:
            if (!bdUser.canCreateClub) return false;
            if (bdUser.ownedClub) return false;

            return true;
        case JudgeRuling.CAN_MANAGE_MEMBERS:
            const isCurrentUserAdminOrOwner = bdUser.memberships.some(m => m.clubId === request.clubId && m.role === 'ADMIN')
                || bdUser.ownedClub?.id === request.clubId;
                
            return isCurrentUserAdminOrOwner;

        case JudgeRuling.CAN_SEE_FINANCIAL_INFO:
            return bdUser.memberships.some(m => m.clubId === request.clubId && m.role === 'ADMIN')
                || bdUser.ownedClub?.id === request.clubId;

        case JudgeRuling.CAN_CREATE_EVENT:
            return bdUser.memberships.some(m => m.clubId === request.clubId && m.role === 'ADMIN')
                || bdUser.ownedClub?.id === request.clubId;
                
        default:
            return false;
    }
}

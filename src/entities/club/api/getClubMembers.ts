import { prisma } from '@/shared/prisma';
import { ClubMemberFrontT, ClubMemberBannedFrontT } from '../model/schema';
import { ClubMembersT } from '../model/types';

export async function getClubMembers(clubId: string): Promise<ClubMembersT> {
    const bannedRecords = await prisma.banHistory.findMany({
        where: { clubId, unbannedAt: null },
        include: {
        user: {
                include: {
                    memberships: {
                        where: { clubId },
                        select: { role: true, joinedAt: true },
                    },
                },
            },
        },
    });

    const bannedUserIds = bannedRecords.map((b) => b.userId);

    const allMembers = await prisma.membership.findMany({
        where: {
            clubId,
            userId: { notIn: bannedUserIds.length ? bannedUserIds : [''] },
        },
        include: { user: true },
    });

    const admins: ClubMemberFrontT[] = allMembers.filter((member) => member.role === 'ADMIN').map((m) =>({
        id: m.user.id,
        telegramId: m.user.telegramId,
        userName: m.user.userName,
        firstName: m.user.firstName,
        joinedAt: m.joinedAt,
        role: m.role,
        clubId,
    }));

    const members: ClubMemberFrontT[] = allMembers.filter((member) => member.role === 'MEMBER').map((m) =>({
        id: m.user.id,
        telegramId: m.user.telegramId,
        userName: m.user.userName,
        firstName: m.user.firstName,
        joinedAt: m.joinedAt,
        role: m.role,
        clubId,
    }));

    const banned: ClubMemberBannedFrontT[] = bannedRecords.map((b) => ({
        id: b.user.id,
        telegramId: b.user.telegramId,
        userName: b.user.userName,
        firstName: b.user.firstName,
        bannedAt: b.bannedAt,
        reason: b.reason || undefined,
        role: b.user.memberships[0]?.role,
        joinedAt: b.user.memberships[0]?.joinedAt,
        clubId,
    }));

    return { admins, members, banned };
}

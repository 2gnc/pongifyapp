import { prisma } from '@/shared/prisma';
import { ClubMemberFrontT } from '../model/schema';
import { ClubMembersT } from '../model/types';

export async function getClubMembers(id: string): Promise<ClubMembersT> {
    const allMembers = await prisma.membership.findMany({
        where: {
            clubId: id,
        },
        include: {
            user: true,
        },
    });

    const admins: ClubMemberFrontT[] = allMembers.filter((member) => member.role === 'ADMIN').map((m) =>({
        id: m.user.id,
        telegramId: m.user.telegramId,
        userName: m.user.userName,
        firstName: m.user.firstName,
        joinedAt: m.joinedAt,
    }));

    const members: ClubMemberFrontT[] = allMembers.filter((member) => member.role === 'MEMBER').map((m) =>({
        id: m.user.id,
        telegramId: m.user.telegramId,
        userName: m.user.userName,
        firstName: m.user.firstName,
        joinedAt: m.joinedAt,
    }));

    return { admins, members, banned: [] };
}

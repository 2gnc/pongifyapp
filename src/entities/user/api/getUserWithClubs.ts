import { prisma } from '@/shared/prisma';
import { UserFrontT } from '@/entities/user';

export async function getUserWithClubs(telegramId: string): Promise<UserFrontT | null> {
    const user = await prisma.user.findUnique({
        where: { telegramId },
        include: {
            ownedClub: true,
            memberships: {
                include: {
                    club: true,
                },
            },
        },
    });

    if (!user) return null;

    const adminClubs = user.memberships
        .filter((m) => m.role === 'ADMIN')
        .map((m) => ({ clubId: m.club.id, clubName: m.club.name }));

    const memberClubs = user.memberships
        .filter((m) => m.role === 'MEMBER')
        .map((m) => ({ clubId: m.club.id, clubName: m.club.name }));

    const ownedClub = user.ownedClub ? {
        clubId: user.ownedClub.id,
        clubName: user.ownedClub.name,
    } : null;

    return {
        ...user,
        ownedClub,
        admin: adminClubs,
        member: memberClubs,
    };
}

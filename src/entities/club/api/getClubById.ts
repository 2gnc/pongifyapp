import { prisma } from '@/shared/prisma';
import { ClubFrontT } from '@/entities/club';

export async function getClubById(id: string): Promise<ClubFrontT | null> {
    const page = 0;
    const pageSize = 20;

    const club = await prisma.club.findUnique({
        where: { id },
        include: {
            members: {
                take: pageSize,
                skip: page * pageSize,
                include: { user: true },
            },
            bans: { include: { user: true } },
        },
    });

    return club;
}

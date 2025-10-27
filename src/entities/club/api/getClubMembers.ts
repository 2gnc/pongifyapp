import { prisma } from '@/shared/prisma';
import { ClubMemberFrontT } from '../model/schema';

export async function getClubMembers(id: string): Promise<{ admins: ClubMemberFrontT[]; members: ClubMemberFrontT[]; }> {
    const members = await prisma.membership.findMany({
        where: {
            clubId: id,
        },
        include: {
            user: true, // подтягиваем данные о пользователе
        },
    });

    console.log('🤡', members);

    return { admins: [], members: [] };
}

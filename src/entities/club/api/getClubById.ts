import { prisma } from '@/shared/prisma';
import { ClubFrontT } from '@/entities/club';

export async function getClubById(id: string): Promise<ClubFrontT | null> {
    const club = await prisma.club.findUnique({
        where: { id },
    });

    if (!club) return null;

    return {
        id: club.id,
        name: club.name,
        description: club.description,
        createdAt: club.createdAt,
        isOpen: club.isOpen,
        ownerId: club.ownerId,
        admins: [],
        members: [],
    };
}

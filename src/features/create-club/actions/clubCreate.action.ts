'use server';

import { clubCreateSchema, ClubCreateSchemaT } from '@/entities/club';
import { getUserFromCookies, getUserWithClubs, updateUserCookie } from '@/entities/user';
import { prisma } from '@/shared/prisma';
import { ErrorCodeEnum } from '@/shared/errors/errorCodes';

export async function clubCreateAction(formData: ClubCreateSchemaT) {
    const userdata = await getUserFromCookies();

    if (!userdata) {
        return { success: false, error: ErrorCodeEnum.UNAUTHORIZED };
    }

    const parsed = clubCreateSchema.safeParse(formData);

    if (!parsed.success) {
        return { success: false, error: ErrorCodeEnum.INVALID_DATA };
    }

    const clubCreationData = parsed.data;

    const owner = await prisma.user.findUnique({
        where: { id: userdata.id },
        include: { ownedClub: true },
    });

    if (!owner) {
        return { success: false, error: ErrorCodeEnum.NOT_FOUND };
    }

    if (owner.ownedClub) {
        return { success: false, error: ErrorCodeEnum.HAS_CLUB_ALREADY };
    }

    try {
        const club = await prisma.$transaction(async (tx) => {
            const newClub = await tx.club.create({
                data: {
                    name: clubCreationData.name,
                    description: clubCreationData.description || '',
                    isOpen: clubCreationData.isOpen,
                    ownerId: owner.id,
                },
            });

            await tx.membership.create({
                data: {
                    userId: owner.id,
                    clubId: newClub.id,
                    role: 'OWNER',
                },
            });

            return newClub;
        });

        const userWithClub = await getUserWithClubs(owner.id);
        await updateUserCookie(userWithClub);

        return { success: true, data: club };
    } catch (_e) {
        return { success: false, error: ErrorCodeEnum.INTERNAL };
    }
}

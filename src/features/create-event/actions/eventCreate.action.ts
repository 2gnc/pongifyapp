'use server';

import { eventCreateSchema, EventCreateSchemaT } from '@/entities/event';
import { getUserFromCookies } from '@/entities/user';
import { prisma } from '@/shared/prisma';
import { ErrorCodeEnum } from '@/shared/errors/errorCodes';
import { judgeAllows, JudgeRuling } from '@/features/judge';

export async function eventCreateAction(formData: EventCreateSchemaT, clubId: string) {
    const userdata = await getUserFromCookies();

    if (!userdata) {
        return { success: false, error: ErrorCodeEnum.UNAUTHORIZED };
    }

    const parsed = eventCreateSchema.safeParse(formData);

    if (!parsed.success) {
        return { success: false, error: ErrorCodeEnum.INVALID_DATA };
    }

    const eventCreationData = parsed.data;

    // Проверяем права пользователя на создание события в клубе
    const canCreateEvent = await judgeAllows({
        type: JudgeRuling.CAN_CREATE_EVENT,
        clubId: clubId
    });

    if (!canCreateEvent) {
        return { success: false, error: ErrorCodeEnum.FORBIDDEN };
    }

    try {
        // Проверяем, что клуб существует
        const club = await prisma.club.findUnique({
            where: { id: clubId }
        });

        if (!club) {
            return { success: false, error: ErrorCodeEnum.NOT_FOUND };
        }

        // Создаем событие
        const event = await prisma.event.create({
            data: {
                clubId: clubId,
                type: eventCreationData.type,
                startAt: new Date(eventCreationData.startAt),
                description: eventCreationData.description,
                setCodes: eventCreationData.setCodes,
                maxParticipants: eventCreationData.maxParticipants,
                registrationOpensAt: new Date(eventCreationData.registrationOpensAt),
            },
        });

        return { success: true, data: event };
    } catch (_e) {
        return { success: false, error: ErrorCodeEnum.INTERNAL };
    }
}
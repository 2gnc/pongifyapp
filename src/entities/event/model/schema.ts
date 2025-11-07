import { z } from 'zod';
import { EventType } from '@/generated/prisma';

export const eventCreateSchema = z.object({
    type: z.enum(EventType),
    startAt: z.string().min(1, 'Укажите дату начала'),
    description: z.string().min(3, 'Минимум 3 символа'),
    setCodes: z.array(z.string()).min(1, 'Выберите хотя бы один сет'),
    maxParticipants: z.number().int().positive().optional(),
    registrationOpensAt: z.string().min(1, 'Укажите дату открытия регистрации'),
});

export type EventCreateSchemaT = z.infer<typeof eventCreateSchema>;

export const createEventFormDefaultValues = {
    type: 'DRAFT' as const,
    startAt: "",
    description: "",
    setCodes: [],
    maxParticipants: undefined,
    registrationOpensAt: "",
};

export const EventFrontSchema = z.object({
    id: z.string(),
    clubId: z.string(),
    type: z.enum(['DRAFT', 'SEALED', 'TWO_PICKS_DRAFT', 'PRERELEASE', 'COMMANDER_DRAFT', 'BUNDLE_SEALED', 'DISPLAY_SEALED', 'COMMANDER_PARTY', 'CUBE_DRAFT', 'RAINBOW_DRAFT']),
    startAt: z.union([
        z.date(),
        z.iso.datetime({ offset: true }),
    ]).transform(val => val instanceof Date ? val : new Date(val)),
    description: z.string(),
    setCodes: z.array(z.string()),
    maxParticipants: z.number().int().positive().nullable(),
    registrationOpensAt: z.union([
        z.date(),
        z.iso.datetime({ offset: true }),
    ]).transform(val => val instanceof Date ? val : new Date(val)),
    createdAt: z.union([
        z.date(),
        z.iso.datetime({ offset: true }),
    ]).transform(val => val instanceof Date ? val : new Date(val)),
    updatedAt: z.union([
        z.date(),
        z.iso.datetime({ offset: true }),
    ]).transform(val => val instanceof Date ? val : new Date(val)),
});

export type EventFrontT = z.infer<typeof EventFrontSchema>;

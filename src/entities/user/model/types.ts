import { ClubFront } from '@/entities/club';

export type UserFront = {
    id: string;
    telegramId: string;
    userName: string | null;
    firstName: string | null;
    canCreateClub: boolean;
    ownedClub: ClubFront | null;
    memberships: {
        admin: ClubFront[];
        member: ClubFront[];
    };
};

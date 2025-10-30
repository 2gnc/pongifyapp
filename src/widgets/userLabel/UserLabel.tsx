'use client'

import { type FC, useCallback, useMemo } from 'react';
import { UserLabel } from '@gravity-ui/uikit';
import { CrownDiamond, Person, PersonXmark, PersonWorker } from '@gravity-ui/icons';
import { openTelegramLink } from '@telegram-apps/sdk-react';
import { ClubRole } from '@/generated/prisma';

import { ClubMemberBannedFrontT, ClubMemberFrontT } from '@/entities/club';
import { UserFrontT } from '@/entities/user';

type Props = {
    user: ClubMemberFrontT | UserFrontT | ClubMemberBannedFrontT;
    role: ClubRole
    clear?: boolean;
};
export const ClubUserLabel: FC<Props> = ({ user, role, clear = false }) => {

    const handleClick = useCallback(() => {
        openTelegramLink(`https://t.me/${user?.userName}`);
    }, [user?.userName]);

    const { Icon, color } = useMemo(() => {
        if ((user as ClubMemberBannedFrontT).bannedAt) {
            return { Icon: PersonXmark, color: '#f54242' }; // красный
        }

        switch (role) {
            case ClubRole.OWNER:
                return { Icon: CrownDiamond, color: '#f5c542' }; // золотой
            case ClubRole.ADMIN:
                return { Icon: PersonWorker, color: '#4a90e2' }; // синий
            default:
                return { Icon: Person, color: '#999' }; // серый
        }
    }, [role, user]);

    return (
        <UserLabel
            view={clear ? 'clear' : 'outlined'}
            avatar={{icon: Icon, color}}
            type="person"
            text={user.userName || user.firstName}
            size='xs'
            onClick={handleClick}
        />  
    );
}

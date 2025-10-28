'use client'

import { type FC, useCallback, useMemo } from 'react';
import { UserLabel } from '@gravity-ui/uikit';
import { CrownDiamond, PersonPencil, Person } from '@gravity-ui/icons';
import { openTelegramLink } from '@telegram-apps/sdk-react';
import { ClubRole } from '@/generated/prisma';

import { ClubMemberFrontT } from '@/entities/club';
import { UserFrontT } from '@/entities/user';

type Props = {
    user: ClubMemberFrontT  |UserFrontT;
    role: ClubRole
    clear?: boolean;
};
export const ClubUserLabel: FC<Props> = ({ user, role, clear = false }) => {

    const handleClick = useCallback(() => {
        openTelegramLink(`https://t.me/${user?.userName}`);
    }, []);

    const { Icon, color } = useMemo(() => {
        switch (role) {
            case ClubRole.OWNER:
                return { Icon: CrownDiamond, color: '#f5c542' }; // золотой
            case ClubRole.ADMIN:
                return { Icon: PersonPencil, color: '#4a90e2' }; // синий
            default:
                return { Icon: Person, color: '#999' }; // серый
        }
    }, [role]);

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

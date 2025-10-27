'use client'

import { type FC, useCallback } from 'react';
import { UserLabel } from '@gravity-ui/uikit';
import { CrownDiamond, PersonPencil, Person } from '@gravity-ui/icons';
import { openTelegramLink } from '@telegram-apps/sdk-react';

import { ClubMemberFrontT } from '@/entities/club';
import { UserFrontT } from '@/entities/user';

type Props = {
    user: ClubMemberFrontT | UserFrontT;
    type: 'owner' | 'admin' | 'member';
};
export const ClubUserLabel: FC<Props> = ({ user, type }) => {
    const Icon = type === 'owner' ? CrownDiamond : type === 'admin' ? PersonPencil : Person;

    const handleClick = useCallback(() => {
        openTelegramLink(`https://t.me/${user?.userName}`);
    }, []);

    return (
        <UserLabel avatar={{icon: Icon}} type="person" text={user.userName || user.firstName} size='xs' onClick={handleClick} />
    );
}

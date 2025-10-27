'use client'

import { type FC, useCallback } from 'react';
import { UserLabel } from '@gravity-ui/uikit';
import { CrownDiamond, PersonPencil, Person } from '@gravity-ui/icons';
import { openTelegramLink } from '@telegram-apps/sdk-react';

import { UserFrontT } from '..';

type Props = {
    user: UserFrontT;
    type: 'owner' | 'admin' | 'member';
};
export const ClubUserLabel: FC<Props> = ({ user, type }) => {
    const Icon = type === 'owner' ? CrownDiamond : type === 'admin' ? PersonPencil : Person;

    const handleClick = useCallback(() => {
        openTelegramLink(`https://t.me/${user?.userName}`);
    }, []);

    return (
        <UserLabel avatar={{icon: Icon}} type="person" text={user.userName} size='xs' onClick={handleClick} />
    );
}

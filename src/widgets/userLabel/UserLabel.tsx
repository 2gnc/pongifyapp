'use client'

import { type FC, useCallback, useMemo } from 'react';
import { Flex, Text } from '@gravity-ui/uikit';
import { openTelegramLink } from '@telegram-apps/sdk-react';
import { ClubRole } from '@/generated/prisma';

import { ClubMemberBannedFrontT, ClubMemberFrontT } from '@/entities/club';
import { UserFrontT } from '@/entities/user';

type Props = {
    user: ClubMemberFrontT | UserFrontT | ClubMemberBannedFrontT;
    role: ClubRole;
    className?: string;
    color: 'light' | 'dark';
    clear?: boolean;
};
export const ClubUserLabel: FC<Props> = ({ user, role, className = '', color, clear }) => {
    const textClass = color === 'dark' ? 'text-pong-text' : 'text-white';

    const handleClick = useCallback(() => {
        openTelegramLink(`https://t.me/${user?.userName}`);
    }, [user?.userName]);

    const icon = useMemo(() => {
        if ((user as ClubMemberBannedFrontT).bannedAt) {
            return '🚫';
        }

        switch (role) {
            case ClubRole.OWNER:
                return '👑';
            case ClubRole.ADMIN:
                return '⭐️';
            default:
                return '🧙🏻';
        }
    }, [role, user]);


    return (
        <Flex
            alignItems='flex-end'
            onClick={handleClick}
            className={`text-pong-text gap-1 ${className} ${textClass}`}
            gap={1}
        >
            {!clear && icon}
            <Text className='underline'>{user.userName || user.firstName}</Text>
        </Flex>
    );
}

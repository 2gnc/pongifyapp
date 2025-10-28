import { ClubMemberBannedFrontT, ClubMemberFrontT } from '@/entities/club';
import { type FC, useMemo } from 'react';
import { DropdownMenu, type DropdownMenuItem, Flex, Button } from '@gravity-ui/uikit';
import { ClubUserLabel } from '../userLabel';

type Props = {
    member: ClubMemberFrontT | ClubMemberBannedFrontT;
};

export const ClublistItem: FC<Props> = ({ member }) => {
    const isbanned = Boolean((member as ClubMemberBannedFrontT).bannedAt);
    const optios = useMemo<DropdownMenuItem[]>(() => [
        {
            action: () => console.log('Rename'),
            text: member.role === 'ADMIN' ? 'Разжаловать' : 'Назначить админом',
        },
        {
            action: () => console.log('Delete'),
            text: 'Забанить',
            theme: 'danger',
        },
    ], []);

    return (
        <Flex justifyContent="space-between" className="w-full block" style={{ width: '100%' }}>
                <ClubUserLabel user={member} role={member.role} clear />
            <DropdownMenu size="l" items={optios} />
        </Flex>
    );
};

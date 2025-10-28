import { type FC, useMemo } from 'react';
import { ClubMemberBannedFrontT, ClubMemberFrontT } from '@/entities/club';
import { DropdownMenu, type DropdownMenuItem, Flex } from '@gravity-ui/uikit';
import { ClubUserLabel } from '../userLabel';
import { useCurrentUser } from '@/features/auth';
import { useAppointMemberAsAdmin, useDemoteMemberFromAdmin } from '@/features/manage-club-members';

type Props = {
    member: ClubMemberFrontT | ClubMemberBannedFrontT;
    clubId: string;
};

export const ClublistItem: FC<Props> = ({ member, clubId }) => {

    const currentUser = useCurrentUser();
    const isCurrentUserOwner = currentUser?.ownedClub?.clubId === clubId;
    const isCurrentUserAdmin = currentUser?.admin.some((club) => club.clubId === clubId);
    const isbanned = Boolean((member as ClubMemberBannedFrontT).bannedAt);

    const { action: appointAdminAction, isPending: appointAdminPending } = useAppointMemberAsAdmin(clubId, member.id);
    const { action: demoteAdminAction, isPending: demoteAdminPending } = useDemoteMemberFromAdmin(clubId, member.id);

    const options = useMemo<DropdownMenuItem[]>(() => {
        const options: DropdownMenuItem[] = [];

        if (isCurrentUserOwner) {
            options.push({
                action: member.role === 'MEMBER'
                    ? appointAdminAction
                    : demoteAdminAction,
                text: member.role === 'ADMIN' ? 'Разжаловать' : 'Назначить админом',
            });
        }

        if (isCurrentUserOwner || isCurrentUserAdmin) {
            options.push({
                action: () => console.log('Delete'),
                text: 'Забанить',
                theme: 'danger',
            });
        }

        return options;
    }, []);

    return (
        <Flex justifyContent="space-between" alignItems="center" className="w-full block pt-2 pb-2" style={{ width: '100%' }}>
            <ClubUserLabel user={member} role={member.role} clear />
            { options.length && <DropdownMenu size="l" items={options} disabled={appointAdminPending || demoteAdminPending} /> }
        </Flex>
    );
};

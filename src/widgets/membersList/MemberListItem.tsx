import { type FC, useMemo, useState, useCallback, memo } from 'react';
import { DropdownMenu, type DropdownMenuItem, Flex } from '@gravity-ui/uikit';
import { ClubMemberBannedFrontT, ClubMemberFrontT } from '@/entities/club';
import { ClubUserLabel } from '../userLabel';
import { useCurrentUser } from '@/features/auth';
import { useAppointMemberAsAdmin, useDemoteMemberFromAdmin } from '@/features/manage-club-admins';
import { useBanUser } from '@/features/ban-user';
import { BanUserModal } from '@/features/ban-user/ui/BanUserModal';

type Props = {
    member: ClubMemberFrontT | ClubMemberBannedFrontT;
    clubId: string;
};

export const ClublistItem: FC<Props> = memo(({ member, clubId }) => {
    const [isBanModalOpen, setBanModalOpen] = useState(false);
    const currentUser = useCurrentUser();
    const isCurrentUserOwner = currentUser?.ownedClub?.clubId === clubId;
    const isCurrentUserAdmin = currentUser?.admin.some((club) => club.clubId === clubId);
    const isBanned = Boolean((member as ClubMemberBannedFrontT).bannedAt);

    const { action: appointAdminAction, isPending: appointAdminPending } = useAppointMemberAsAdmin(clubId, member.id);
    const { action: demoteAdminAction, isPending: demoteAdminPending } = useDemoteMemberFromAdmin(clubId, member.id);
    const { banUser, isPending: banUserPending } = useBanUser({
        clubId: clubId,
        userId: member.id,
        bannedById: currentUser?.id,
        userName: member.userName || member.firstName || '',
    });

    const handleBanSubmit = useCallback((reason: string) => {
        banUser(reason);
        setBanModalOpen(false);
    }, [banUser]);

    const handleOpenBanModal = useCallback(() => setBanModalOpen(true), []);
    const handleCloseBanModal = useCallback(() => setBanModalOpen(false), []);

    const options = useMemo<DropdownMenuItem[]>(() => {
        const options: DropdownMenuItem[] = [];

        if (isBanned) {
            options.push({
                action: () => console.log('Delete'),
                text: 'Разбанить',
                theme: 'danger',
            });

            return options;
        }

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
                action: handleOpenBanModal,
                text: 'Забанить',
                theme: 'danger',
            });
        }

        return options;
    }, [isBanned, isCurrentUserOwner, isCurrentUserAdmin, member.role, appointAdminAction, demoteAdminAction, handleOpenBanModal]);

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" className="w-full block pt-2 pb-2" style={{ width: '100%' }}>
                <ClubUserLabel user={member} role={member.role} clear />
                { options.length && <DropdownMenu size="l" items={options} disabled={appointAdminPending || demoteAdminPending || banUserPending} /> }
            </Flex>
            <BanUserModal
                key={member.id}
                isModalOpen={isBanModalOpen}
                setModalOpen={handleCloseBanModal}
                onSubmit={handleBanSubmit}
                userName={member.userName || member.firstName || ''}
                isPending={banUserPending}
            />
        </>
    );
});

ClublistItem.displayName = 'ClublistItem';

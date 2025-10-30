import { type FC, useMemo, useState, useCallback, memo } from 'react';
import { DropdownMenu, type DropdownMenuItem, Flex } from '@gravity-ui/uikit';
import { ClubMemberBannedFrontT, ClubMemberFrontT } from '@/entities/club';
import { ClubUserLabel } from '../userLabel';
import { useCurrentUser } from '@/features/auth';
import { useAppointMemberAsAdmin, useDemoteMemberFromAdmin } from '@/features/manage-club-admins';
import { useBanUser, BanUserModal, useUnbanUser, UnbanUserModal } from '@/features/ban-user';

type Props = {
    member: ClubMemberFrontT | ClubMemberBannedFrontT;
    clubId: string;
};

export const ClublistItem: FC<Props> = memo(({ member, clubId }) => {
    const [isBanModalOpen, setBanModalOpen] = useState(false);
    const [isUnbanModalOpen, setUnbanModalOpen] = useState(false);

    const currentUser = useCurrentUser();
    const isCurrentUserOwner = currentUser?.ownedClub?.clubId === clubId;
    const isCurrentUserAdmin = currentUser?.admin.some((club) => club.clubId === clubId);
    const isBanned = Boolean((member as ClubMemberBannedFrontT).bannedAt);
    
    const handleOpenBanModal = useCallback(() => setBanModalOpen(true), []);
    const handleOpenUnbanModal = useCallback(() => setUnbanModalOpen(true), []);
    const handleCloseBanModal = useCallback(() => setBanModalOpen(false), []);
    const handleCloseUnbanModal = useCallback(() => setUnbanModalOpen(false), []);

    const { action: appointAdminAction, isPending: appointAdminPending } = useAppointMemberAsAdmin(clubId, member.id);
    const { action: demoteAdminAction, isPending: demoteAdminPending } = useDemoteMemberFromAdmin(clubId, member.id);
    const { action: banUserAction, isPending: banUserPending } = useBanUser({
        clubId: clubId,
        userId: member.id,
        bannedById: currentUser?.id,
        userName: member.userName || member.firstName || '',
    }, handleCloseBanModal);
    const { action: unbanUserAction, isPending: unbanUserPending} = useUnbanUser({
        clubId: clubId,
        userId: member.id,
    }, handleCloseUnbanModal);

    const handleBanSubmit = useCallback((reason: string) => {
        banUserAction(reason);
        setBanModalOpen(false);
    }, [banUserAction]);


    const options = useMemo<DropdownMenuItem[]>(() => {
        const options: DropdownMenuItem[] = [];

        if (isBanned) {
            options.push({
                action: handleOpenUnbanModal,
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
    }, [
        isBanned,
        isCurrentUserOwner,
        isCurrentUserAdmin,
        member.role,
        handleOpenUnbanModal,
        appointAdminAction,
        demoteAdminAction,
        handleOpenBanModal,
    ]);

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" className="w-full block pt-2 pb-2" style={{ width: '100%' }}>
                <ClubUserLabel user={member} role={member.role} clear />
                { options.length && <DropdownMenu size="l" items={options} disabled={appointAdminPending || demoteAdminPending || banUserPending || unbanUserPending} /> }
            </Flex>
            <BanUserModal
                key={member.id + 'b'}
                isModalOpen={isBanModalOpen}
                onCancel={handleCloseBanModal}
                onSubmit={handleBanSubmit}
                userName={member.userName || member.firstName || ''}
                isPending={banUserPending}
            />
            <UnbanUserModal
                key={member.id + 'u'}
                isModalOpen={isUnbanModalOpen}
                onCancel={handleCloseUnbanModal}
                user={member as ClubMemberBannedFrontT}
                onSubmit={unbanUserAction}
                isPending={unbanUserPending}
            />
        </>
    );
});

ClublistItem.displayName = 'ClublistItem';

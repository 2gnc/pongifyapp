'use client'

import { type FC, useState, useCallback, useEffect } from 'react';
import { NavButton } from './NavButton';
import { Sheet, Divider } from '@gravity-ui/uikit';
import { CrownDiamond, Comments, Bookmark } from '@gravity-ui/icons';
import { mapUrlToPage } from '../lib/map-url-to-page';
import { useCurrentUser, checkIsSuperAdmin } from '@/features/auth';
import { PageEnum  } from '../model/page-enum';
import { NavItem } from './NavItem';
import { useTranslations } from 'next-intl';

type Props = {
    url: string | null;
}

export const Navigation: FC<Props> = ({ url }) => {
    const [visible, setVisible] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    const user = useCurrentUser();
    const t = useTranslations('i18n');

    const page = mapUrlToPage(url);

    const handleCloseSheet = useCallback(() => {
        setVisible(false);
    }, []);

    const handleOpenSheet = useCallback(() => {
        setVisible(true);
    }, []);

    useEffect(() => {
        checkIsSuperAdmin().then(setIsSuperAdmin);
    }, []);

    if (!user) return null;
    
    const ownedClubLink = page === PageEnum.CLUB_DETAIL ? '#' : `/clubs/${user?.ownedClub?.clubId}`;
    const allMembershipLength = user?.member.length && user.admin.length;
    const hasOwnedClub = Boolean(user?.ownedClub);
    const hasAdminnedClubs = Boolean(user?.admin.length);

    return (
        <>
            <NavButton onClick={handleOpenSheet} />
            <Sheet visible={visible} onClose={handleCloseSheet} contentClassName='mb-8'>
                {
                    (hasAdminnedClubs || hasOwnedClub) && (
                        <Divider align='center' className='mt-2'>
                            <CrownDiamond className='mr-2'/>
                            {t('navigation.clubManagement')}
                        </Divider>
                    )
                }
                {hasOwnedClub && <NavItem title={user?.ownedClub?.clubName!} link={ownedClubLink} onClose={handleCloseSheet} />}
                {hasAdminnedClubs && user.admin.map(({ clubId, clubName }) => <NavItem key={clubId} title={clubName} link={`/clubs/${clubId}`} onClose={handleCloseSheet} /> )}
                <Divider align='center' className='mt-2'>
                    <Comments className='mr-2' />
                    {t('navigation.community')}
                </Divider>
                    <NavItem title={t('navigation.allClubs')} link={'/clubs'} onClose={handleCloseSheet} />
                    <NavItem title={t('navigation.allEvents')} />
                {allMembershipLength > 0 && (
                    <Divider align='center' className='mt-2'>
                        <Bookmark className='mr-2' />
                        {t('navigation.myClubs')}
                    </Divider>
                )}
                {user.admin.map(({ clubId, clubName }) => <NavItem key={clubId} title={clubName} link={`/clubs/${clubId}`} onClose={handleCloseSheet} />)}
                {user.member.map(({ clubId, clubName }) => <NavItem key={clubId} title={clubName} link={`/clubs/${clubId}`} onClose={handleCloseSheet} />)}
                {isSuperAdmin && (
                    <>
                        <Divider align='center' className='mt-2'>
                            {t('navigation.superAdmin')}
                        </Divider>
                        <NavItem title={t('navigation.superAdmin')} link={'/superadmin'} onClose={handleCloseSheet} />
                    </>
                )}
            </Sheet>
        </>
    );
}

'use client'

import { useMemo, useState, type FC } from 'react';
import { useTranslations } from 'next-intl';
import { Text, SegmentedRadioGroup, List, Flex } from '@gravity-ui/uikit';
import { ClubMembersT } from '@/entities/club';
import { MembersListItem } from './MemberListItem';

type Props = {
    clubMembers: ClubMembersT;
    clubId: string;
    tab: 'admins' | 'members' | 'bans' | 'all';
}

enum TabEnum {
    ALL = 'all',
    ADMINS = 'admins',
    BANNED = 'banned',
}

function mapTabToTabEnum(tab: 'admins' | 'members' | 'bans' | 'all'): TabEnum {
    if (tab === 'admins') return TabEnum.ADMINS;
    if (tab === 'bans') return TabEnum.BANNED;
    return TabEnum.ALL;
}

export const MembersList: FC<Props> = ({ clubMembers, clubId, tab }) => {
    const t = useTranslations('i18n');
    const [currentFilter, setCurrentFilter] = useState(mapTabToTabEnum(tab));

    const filteredMembers = useMemo(() => {
        switch (currentFilter) {
            case TabEnum.ALL:
                return clubMembers.admins.concat(clubMembers.members);
            case TabEnum.ADMINS:
                return clubMembers.admins;
            case TabEnum.BANNED:
                return clubMembers.banned
        }
    }, [clubMembers, currentFilter]);

    const options = useMemo(() => {
        return [
            <SegmentedRadioGroup.Option key="all" value={TabEnum.ALL}>{t('membersList.all')}</SegmentedRadioGroup.Option>,
            <SegmentedRadioGroup.Option key="admins" value={TabEnum.ADMINS}>{t('membersList.admins')}</SegmentedRadioGroup.Option>,
            <SegmentedRadioGroup.Option key="banned" value={TabEnum.BANNED}>{t('membersList.banned')}</SegmentedRadioGroup.Option>,
        ]
    }, [t]);

    return (
        <>
            <Flex className='mt-2' gap={2} justifyContent='space-between'>
                <SegmentedRadioGroup
                    value={currentFilter}
                    onUpdate={setCurrentFilter}
                    name="filter"
                    defaultValue={TabEnum.ALL}
                    size="s"
                >
                    {options}
                </SegmentedRadioGroup>
            </Flex>
            <List
                className='mt-2 h-100'
                items={filteredMembers}
                renderItem={(item) => <MembersListItem clubId={clubId} member={item} />}
                itemsHeight={300}
                filterItem={(filter) => (item) => Boolean(item.userName?.includes(filter) || item.firstName?.includes(filter))}
            />
        </>
    );
}

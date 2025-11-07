import { type FC } from 'react';
import { Text, Flex } from '@gravity-ui/uikit';
import { UserFrontT } from '@/entities/user';
import { useTranslations } from 'next-intl';
import { ClubUserLabel } from '@/widgets/userLabel';
import { ClubRole } from '@/generated/prisma';

type Props = {
    isOpen: boolean;
    owner: UserFrontT;
    description: string | null;
};

export const ClubDetailsSubheader: FC<Props> = ({ isOpen, owner, description }) => {
    const t = useTranslations('i18n.club');
    const typeText = isOpen ? t('isOpen') : t('isClosed');
    const typeIcon = isOpen ? '🌏' : '🔒';

    return (
        <Flex className='pb-4 text-white' gap={2} direction='column'>
            <Flex gap={4}>
                <Text>{`${typeIcon} ${typeText}`}</Text>
                <ClubUserLabel user={owner} role={ClubRole.OWNER} className='text-white' color='light' />
            </Flex>
            { description && <Text variant="caption-2">{description}</Text> }
        </Flex>
    );
};
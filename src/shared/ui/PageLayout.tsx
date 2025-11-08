'use client'

import { type FC, type PropsWithChildren } from 'react';
import { Text, Flex, Button, Icon } from '@gravity-ui/uikit';
import { ArrowLeft } from '@gravity-ui/icons';

type Props = {
    title: string;
    subtitle?: React.ReactNode;
    onBack?: () => void;
}

export const PageLayout: FC<PropsWithChildren<Props>> = ({ title, subtitle, children, onBack }) => {

    return (
        <Flex direction="column">
            <Flex alignItems="center" className='text-white pt-4 pb-2'>
                {onBack && (
                    <Button view="outlined" size="l" onClick={onBack} className='mr-4'>
                        <Icon data={ArrowLeft} size={18} />
                    </Button>
                )}
                <Text variant="header-1">{title}</Text>
            </Flex>
            {subtitle && (
                <Flex alignItems="center">
                    {subtitle}
                </Flex>
            )}
            <Flex direction="column">
                {children}
            </Flex>
        </Flex>
    );
}
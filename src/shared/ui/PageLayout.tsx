import { type FC, type PropsWithChildren } from 'react';
import { Text, Flex } from '@gravity-ui/uikit';

type Props = {
    title: string;
    subtitle?: React.ReactNode;
}

export const PageLayout: FC<PropsWithChildren<Props>> = ({ title, subtitle, children }) => {
    return (
        <Flex direction="column">
             <Flex alignItems="center" className='text-white pt-4 pb-2'>
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
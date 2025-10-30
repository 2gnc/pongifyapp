import { type FC } from 'react';
import { Button, Modal, Flex, Text } from '@gravity-ui/uikit';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ClubMemberBannedFrontT } from '@/entities/club';

type Props = {
    isModalOpen: boolean;
    onSubmit: () => void;
    onCancel: () => void;
    user: ClubMemberBannedFrontT;
    // userName: string;
    // banReason?: string;
    // bannedBy?: string;
    // bannedAt?: Date;
    isPending?: boolean;
};

export const UnbanUserModal: FC<Props> = ({
    isModalOpen,
    onSubmit,
    onCancel,
    user,
    isPending = false
}) => {
    if (!isModalOpen) {
        return null;
    }

    const { bannedAt, reason, userName, firstName } = user;

    const displayName = userName || firstName;

    const formattedDate = bannedAt 
        ? format(bannedAt, 'dd MMMM yyyy в HH:mm', { locale: ru })
        : 'неизвестно';

    return (
        <Modal
            open={isModalOpen}
            disableEscapeKeyDown
            disableOutsideClick
            className='size-auto'
        >
            <div className='p-4'>
                <Text color="primary" variant="subheader-3">
                    {`Подтвердите разбан пользователя ${displayName}`}
                </Text>
                
                <Text className="block mt-2 mb-4" color="secondary" variant="body-2">
                    {`Этот пользователь был забанен ${formattedDate}`}
                    {reason && ` по причине: ${reason}`}
                </Text>

                <Flex gap={2}>
                    <Button
                        view='action'
                        type='submit'
                        onClick={onSubmit}
                        loading={isPending}
                        disabled={isPending}
                    >
                        Подтвердить
                    </Button>
                    <Button
                        view='normal'
                        onClick={onCancel}
                        disabled={isPending}
                    >
                        Отмена
                    </Button>
                </Flex>
            </div>
        </Modal>
    );
};

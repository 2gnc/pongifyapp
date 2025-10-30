import { type FC, useCallback } from 'react';
import { Button, Modal, TextArea, Flex, Text } from '@gravity-ui/uikit';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BanUserFormT, banUserFormSchema } from '../model/schema';

type Props = {
    isModalOpen: boolean;
    onSubmit: (reason: string) => void;
    userName: string;
    isPending?: boolean;
    onCancel: () => void;
};

export const BanUserModal: FC<Props> = ({
    isModalOpen,
    onSubmit,
    onCancel,
    userName,
    isPending = false
}) => {
    const formMethods = useForm<BanUserFormT>({
        resolver: zodResolver(banUserFormSchema),
        defaultValues: { reason: '' },
    });

    const { control, handleSubmit, reset } = formMethods;
    
    const handleCancel = useCallback(() => {
        onCancel();
        reset();
    }, [onCancel, reset]);

    const handleFormSubmit = useCallback((data: BanUserFormT) => {
        onSubmit(data.reason);
    }, [onSubmit]);

    if (!isModalOpen) {
        return null;
    }

    return (
        <Modal
            open={isModalOpen}
            disableEscapeKeyDown
            disableOutsideClick
            className='size-auto'
        >
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className='p-4'
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Text color="primary" variant="subheader-3">{`Забанить участника ${userName} в клубе?`}</Text>
                <Text className="block mt-1 mb-2" color="secondary" variant="caption-2">Он не сможет участвовать в событиях клуба и просматривать информацию о нем. Если передумаете - можно разбанить.</Text>
                <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                        <TextArea
                            {...field}
                            className='mb-8 mt-2'
                            hasClear
                            placeholder="Причина бана"
                            minRows={2}
                            disabled={isPending}
                            autoFocus
                        />
                    )}
                />
                <Flex gap={2}>
                    <Button
                        type="submit"
                        view='action'
                        loading={isPending}
                        disabled={isPending}
                    >
                        Забанить
                    </Button>
                    <Button
                        type="button"
                        onClick={handleCancel}
                        view='normal'
                        disabled={isPending}
                    >
                        Отмена
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
};

import { type FC, memo } from 'react';
import { Button, Modal, TextArea, Flex, Text } from '@gravity-ui/uikit';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BanUserFormT, banUserFormSchema } from '../model/schema';

type Props = {
    isModalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    onSubmit: (reason: string) => void;
    userName: string;
    isPending?: boolean;
};

export const BanUserModal: FC<Props> = ({
    isModalOpen,
    setModalOpen,
    onSubmit,
    userName,
    isPending = false
}) => {
    const formMethods = useForm<BanUserFormT>({
        resolver: zodResolver(banUserFormSchema),
        defaultValues: { reason: '' },
    });

    const { control, handleSubmit, reset } = formMethods;
    
    const onCancel = () => {
        setModalOpen(false);
        reset();
    };

    const handleFormSubmit = (data: BanUserFormT) => {
        onSubmit(data.reason);
    };

    return (
        <Modal
            open={isModalOpen}
            onOpenChange={(open) => {
                if (!open) {
                    setModalOpen(false);
                }
            }}
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
                        onClick={onCancel}
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

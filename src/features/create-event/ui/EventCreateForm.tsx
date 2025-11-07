'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormRow } from '@gravity-ui/components';
import { type EventCreateSchemaT, eventCreateSchema, createEventFormDefaultValues } from '@/entities/event';
import { TextArea } from '@gravity-ui/uikit';
import { useEventTypeOptions } from '@/shared/lib/select-options';

type Props = {}

export const EventCreateForm: FC<Props> = ({}) => {
    const t = useTranslations('i18n');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const eventTypeOptions = useEventTypeOptions();

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<EventCreateSchemaT>({
        resolver: zodResolver(eventCreateSchema),
        defaultValues: createEventFormDefaultValues,
    });

    console.log(eventTypeOptions);

    return (
        <form>
            <FormRow label={t('event-create.type')} direction="column" required>
                {/* Здесь будут опции для селекта типа события: {eventTypeOptions} */}
                {/* eventTypeOptions содержит массив объектов {value: string, content: string} */}
            </FormRow>

            <FormRow label={t('event-create.description')} direction="column" required>
                <TextArea
                    {...register('description')}
                    minRows={2}
                    hasClear
                    validationState={errors.description && 'invalid'}
                    placeholder={t('event-create.descriptionPlaceholder')}
                    errorMessage={errors.description?.message}
                    errorPlacement="outside"
                />
            </FormRow>

        </form>
    )
}
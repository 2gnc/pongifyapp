'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useTransition, type FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormRow } from '@gravity-ui/components';
import { type EventCreateSchemaT, eventCreateSchema, createEventFormDefaultValues } from '@/entities/event';
import { TextArea, Select } from '@gravity-ui/uikit';
import { useEventTypeOptions } from '@/shared/lib/select-options';
import { EventTypeButtons } from './EventTypeButtons';
import { EventSetChips } from './EventSetChips';
import { searchSetsAction } from '../actions/searchSets.action';

type Props = {}

export const EventCreateForm: FC<Props> = ({}) => {
    const t = useTranslations('i18n.event-create');
    const [isPending, startTransition] = useTransition();
    const eventTypeOptions = useEventTypeOptions();
    const { id: clubId } = useParams();

    const formMethods = useForm<EventCreateSchemaT>({
        resolver: zodResolver(eventCreateSchema),
        defaultValues: createEventFormDefaultValues,
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = formMethods;

    // Состояния для мультиселекта сетов
    const [setOptions, setSetOptions] = useState<{ value: string; content: string }[]>([]);
    const [isSetsLoading, setIsSetsLoading] = useState(false);
    const [setFilter, setSetFilter] = useState('');

    // Асинхронная загрузка сетов при изменении фильтра
    useEffect(() => {
        const searchSets = async () => {
            if (!setFilter.trim()) {
                setSetOptions([]);
                return;
            }

            setIsSetsLoading(true);
            try {
                const sets = await searchSetsAction(setFilter);
                const options = sets.map(set => ({
                    value: set.code,
                    content: set.name,
                }));
                setSetOptions(options);
            } catch (error) {
                console.error('Error loading sets:', error);
                setSetOptions([]);
            } finally {
                setIsSetsLoading(false);
            }
        };

        const timeoutId = setTimeout(searchSets, 300); // Дебаунс 300мс
        return () => clearTimeout(timeoutId);
    }, [setFilter]);

    const selectedSetCodes = watch('setCodes') || [];

    if (typeof clubId !== 'string') return null;

    return (
        <form className='mt-4 text-white'>
            <FormRow label={t('type')} direction="column" required>
                <EventTypeButtons
                    formMethods={formMethods}
                    options={eventTypeOptions}
                />
            </FormRow>

            <FormRow label={t('description')} direction="column" required>
                <TextArea
                    {...register('description')}
                    minRows={2}
                    hasClear
                    validationState={errors.description && 'invalid'}
                    placeholder={t('descriptionPlaceholder')}
                    errorMessage={errors.description?.message}
                    errorPlacement="outside"
                />
            </FormRow>

            <FormRow label={t('sets')} direction="column" required>
                {errors.setCodes && (
                    <div className="text-accent pb-2">
                        {errors.setCodes?.message}
                    </div>
                )}
                <EventSetChips formMethods={formMethods} />
            </FormRow>

        </form>
    )
}
'use client'

import { FC, useCallback, useEffect, useState, useRef, useMemo, useTransition } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button, Label, TextInput, Popover } from '@gravity-ui/uikit';
import { Plus } from '@gravity-ui/icons';
import { debounce } from 'lodash';
import { EventCreateSchemaT } from '@/entities/event';
import { searchSetsAction } from '../actions/searchSets.action';

interface EventSetChipsProps {
    formMethods: UseFormReturn<EventCreateSchemaT>
}

interface SetOption {
    value: string
    content: string
    name: string
    code: string
}

export const EventSetChips: FC<EventSetChipsProps> = ({
    formMethods,
}) => {
    const { watch, setValue } = formMethods;

    const selectedSetCodes = useMemo(() => watch('setCodes') || [], [watch]);
    const [selectedSets, setSelectedSets] = useState<SetOption[]>([]);

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [setOptions, setSetOptions] = useState<SetOption[]>([]);
    const [setFilter, setSetFilter] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [isPending, startTransition] = useTransition();

    const debouncedSearch = debounce(async (filter: string) => {
        if (filter.trim().length < 3) {
            setSetOptions([])
            return
        }

    startTransition(async () => {
        try {
            const sets = await searchSetsAction(filter)
            const options = sets.map(set => ({
                value: set.code,
                content: set.name,
                name: set.name,
                code: set.code
            }))
            setSetOptions(options)
        } catch (error) {
            console.error('Error loading sets:', error)
            setSetOptions([])
        }
    })}, 300);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch]);

    useEffect(() => {
        debouncedSearch(setFilter)
    }, [setFilter, debouncedSearch]);

    const handleAddSet = useCallback(() => {
        setIsPopoverOpen(true);
        setSetFilter(''); // Сбрасываем фильтр
        // Фокус на инпут после открытия попапа
        setTimeout(() => {
        searchInputRef.current?.focus()
        }, 0);
    }, []);

    const handleSetSelect = useCallback((set: SetOption) => {
        // Добавляем сет в selectedSets, если его там нет
        setSelectedSets(prev => {
            if (prev.some(s => s.code === set.code)) {
                return prev
            }
            return [...prev, set];
        });

        const newSetCodes = [...new Set([...selectedSetCodes, set.code])];
        setValue('setCodes', newSetCodes, { shouldValidate: true });
    
        setIsPopoverOpen(false);
        setSetFilter('');
    }, [selectedSetCodes, setValue])

    const handleRemoveSet = useCallback((codeToRemove: string) => {
        // Удаляем сет из selectedSets
        setSelectedSets(prev => prev.filter(set => set.code !== codeToRemove));

        // Удаляем код сета из формы
        const newSetCodes = selectedSetCodes.filter(code => code !== codeToRemove);
        setValue('setCodes', newSetCodes, { shouldValidate: true });
    }, [selectedSetCodes, setValue]);

    const handlePopoverClose = useCallback(() => {
        setIsPopoverOpen(false);
        setSetFilter('');
    }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Чипсы выбранных сетов */}
      {selectedSets.map((set) => (
        <Label
          key={set.value}
          type="close"
          theme='clear'
          className='text-white'
          onCloseClick={() => handleRemoveSet(set.code)}
          size="s"
        >
          {`${set.name} (${set.code})`}
        </Label>
      ))}

      {/* Кнопка добавления и попап с поиском */}
      <Popover
        open={isPopoverOpen}
        onOpenChange={(open) => !open && handlePopoverClose()}
        content={
          <div className="p-2 min-w-[300px] max-h-[300px] overflow-y-auto">
            <TextInput
              ref={searchInputRef}
              value={setFilter}
              onUpdate={setSetFilter}
              placeholder="Поиск сетов..."
              hasClear
              autoFocus
            />
            {isPending ? (
              <div className="p-2 text-center">Загрузка...</div>
            ) : setOptions.length > 0 ? (
              <div className="mt-2 space-y-1 max-h-[200px] overflow-y-auto">
                {setOptions.map((set) => (
                  <div
                    key={set.value}
                    className="p-2 cursor-pointer rounded text-sm"
                    onClick={() => handleSetSelect(set)}
                  >
                    {`${set.name} (${set.code})`}
                  </div>
                ))}
              </div>
            ) : setFilter.trim().length >= 3 ? (
              <div className="p-2 text-center text-gray-500 text-sm">
                Ничего не найдено
              </div>
            ) : setFilter.trim() ? (
              <div className="p-2 text-center text-gray-500 text-sm">
                Введите минимум 3 символа для поиска
              </div>
            ) : (
              <div className="p-2 text-center text-gray-500 text-sm">
                Введите название сета для поиска
              </div>
            )}
          </div>
        }
      >
        <Button
          view="outlined"
          size="s"
          onClick={handleAddSet}
          className="m-auto"
        >
          <Plus />
        </Button>
      </Popover>
    </div>
  )
}
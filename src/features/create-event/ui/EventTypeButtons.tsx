'use client'

import { Button } from '@gravity-ui/uikit'
import { SelectOption } from '@/shared/lib/select-options'
import { FC, useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { EventCreateSchemaT } from '@/entities/event'

interface EventTypeButtonsProps {
  formMethods: UseFormReturn<EventCreateSchemaT>
  options: SelectOption[]
}

export const EventTypeButtons: FC<EventTypeButtonsProps> = ({
  formMethods,
  options,
}) => {
  const { watch, setValue } = formMethods
  const currentValue = watch('type')

  const handleOptionClick = useCallback((value: string) => {
    setValue('type', value as EventCreateSchemaT['type'], { shouldValidate: true })
  }, [setValue])

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          view={currentValue === option.value ? 'outlined-action' : 'outlined'}
          size="l"
          onClick={() => handleOptionClick(option.value)}
          className="whitespace-nowrap"
        >
          {option.content}
        </Button>
      ))}
    </div>
  )
}
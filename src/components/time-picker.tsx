'use client'

import { useFormContext } from 'react-hook-form'

import { TCreateTaskData } from '@/actions/task/create/schema'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TimePickerProps {
  name: keyof TCreateTaskData
  time: string
  onTimeChanged: (time: string, fieldName: string) => void
}
export function TimePicker({ name, time, onTimeChanged }: TimePickerProps) {
  const { control } = useFormContext<TCreateTaskData>()
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormControl>
            <Select
              defaultValue={time}
              onValueChange={(time) => onTimeChanged(time, name)}
            >
              <SelectTrigger className="focus:ring-0">
                <SelectValue placeholder={time} />
              </SelectTrigger>
              <div>
                <SelectContent className="shadow-none mt-2 border-none">
                  <ScrollArea className="h-[15rem]">
                    {Array.from({ length: 96 }).map((_, i) => {
                      const hour = Math.floor(i / 4)
                        .toString()
                        .padStart(2, '0')
                      const minute = Math.floor((i % 4) * 15)
                        .toString()
                        .padStart(2, '0')
                      return (
                        <SelectItem key={i} value={`${hour}:${minute}`}>
                          {`${hour}:${minute}`}
                        </SelectItem>
                      )
                    })}
                  </ScrollArea>
                </SelectContent>
              </div>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

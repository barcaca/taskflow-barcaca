import { Label, Project } from '@prisma/client'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export enum Priority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}
interface Item {
  id: Priority
  name: string
}

export const dataPriority: Item[] = [
  {
    id: Priority.low,
    name: 'Low',
  },
  {
    id: Priority.medium,
    name: 'Medium',
  },
  {
    id: Priority.high,
    name: 'High',
  },
]

interface FormCreateSelectTaskProps {
  items: Label[] | Project[] | Item[]
  name: string
  placeholder: string
  defaultValue?: string
}
export function FormCreateSelectTask({
  name,
  placeholder,
  items,
  defaultValue,
}: FormCreateSelectTaskProps) {
  const { control } = useFormContext()
  return (
    <>
      <FormField
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map((item) => {
                  return (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

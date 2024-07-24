'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, TagsIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { createLabelAction } from '@/actions/label/create'
import {
  CreateLabelSchema,
  TCreateLabelData,
} from '@/actions/label/create/schema'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { customToast } from '@/lib/custom-toast'

interface FormCreateTagsProps {
  userId: string
  onCloseModal: () => void
}
const defaultValues = {
  name: '',
}
export function FormCreateTags({ userId, onCloseModal }: FormCreateTagsProps) {
  const createLabelById = createLabelAction.bind(null, userId)
  const [isPending, startTransition] = useTransition()
  const form = useForm<TCreateLabelData>({
    resolver: zodResolver(CreateLabelSchema),
    defaultValues,
  })

  async function onCreateLabel(formData: TCreateLabelData) {
    startTransition(() => {
      createLabelById(formData).then((data) => {
        customToast(data)
        if (data.status === 200) {
          form.reset()
          onCloseModal()
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCreateLabel)}>
        <DialogFooter className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative !m-0 flex h-12 items-center rounded-lg border border-border">
                <TagsIcon size={20} className="absolute left-3 text-primary" />
                <FormControl className="!m-0">
                  <Input
                    className="flex-1 pl-9"
                    placeholder="Nome do Tag"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant={'outline'} className="gap-2" disabled={isPending}>
            <PlusIcon size={16} />
            Criar nova Tag
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FolderRootIcon, PlusIcon } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { createProjectAction } from '@/actions/project/create'
import {
  CreateProjectSchema,
  TCreateProjectData,
} from '@/actions/project/create/schema'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { customToast } from '@/lib/custom-toast'

interface FormCreateProjectProps {
  userId: string
  onCloseModal: () => void
}
const defaultValues = {
  name: '',
}
export function FormCreateProject({
  userId,
  onCloseModal,
}: FormCreateProjectProps) {
  const createProjectById = createProjectAction.bind(null, userId)
  const [isPending, startTransition] = useTransition()
  const form = useForm<TCreateProjectData>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues,
  })

  async function onCreateProject(formData: TCreateProjectData) {
    startTransition(() => {
      createProjectById(formData).then((data) => {
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
      <form onSubmit={form.handleSubmit(onCreateProject)}>
        <DialogFooter className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative !m-0 flex h-12 items-center rounded-lg border border-border">
                <FolderRootIcon
                  size={20}
                  className="absolute left-3 text-primary"
                />
                <FormControl className="!m-0">
                  <Input
                    className="flex-1 pl-9"
                    placeholder="Nome do projeto"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant={'outline'} className="gap-2" disabled={isPending}>
            <PlusIcon size={16} />
            Criar novo Projeto
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

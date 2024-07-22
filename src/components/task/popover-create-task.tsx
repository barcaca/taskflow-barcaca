'use client'
import { Label, Project } from '@prisma/client'
import { XIcon } from 'lucide-react'
import { useState } from 'react'

import { FormCreateTask } from '@/components/task/form-create-task'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface PopoverCreateTaskProps {
  labels: Label[]
  projects: Project[]
  userId: string
}

export function PopoverCreateTask({
  labels,
  projects,
  userId,
}: PopoverCreateTaskProps) {
  const [open, setOpen] = useState(false)

  function handleClosePopover() {
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="group absolute bottom-2 left-1/2 w-[250px] -translate-x-1/2 justify-start gap-2 font-semibold shadow-shape transition-all duration-300 xs:w-[350px] md:w-[450px]">
          <XIcon
            size={16}
            className="rotate-45 transition-all duration-300 ease-in-out group-data-[state=open]:rotate-90"
          />
          Criar Tarefa
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={10}
        collisionPadding={12}
        className="w-[300px] transition-all duration-300 data-[state=closed]:!animate-fade-down data-[state=open]:!animate-fade-up xs:w-[350px] md:w-[450px]"
      >
        <FormCreateTask
          labels={labels}
          projects={projects}
          userId={userId}
          onClose={handleClosePopover}
        />
      </PopoverContent>
    </Popover>
  )
}

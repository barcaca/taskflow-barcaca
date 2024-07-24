import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Dot } from 'lucide-react'

import { PopoverCreateTask } from '@/components/task/popover-create-task'
import { TaskList } from '@/components/task/task-list'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getLabels } from '@/lib/data/labels'
import { getProjects } from '@/lib/data/projetos'
import { getGroupTaskByDate, getOverdueTask } from '@/lib/data/task'

interface ProximoTaskWrapperProps {
  title: string
  userId: string
}
export async function ProximoTaskWrapper({
  userId,
  title,
}: ProximoTaskWrapperProps) {
  const [overdue, group] = await Promise.all([
    getOverdueTask(userId),
    getGroupTaskByDate(userId),
  ])
  const [labels, projects] = await Promise.all([
    getLabels(userId),
    getProjects(userId),
  ])
  return (
    <div className="relative flex w-full flex-1 flex-col space-y-3 bg-secondary px-3 py-16 md:px-6">
      <header className="mx-auto w-full md:max-w-4xl">
        <h2 className="text-2xl">{title}</h2>
      </header>
      <ScrollArea>
        <main className="mx-auto h-full w-full space-y-3 md:max-w-4xl">
          <Accordion type="single" collapsible>
            {overdue.length > 0 && (
              <AccordionItem value="overdue">
                <AccordionTrigger>
                  <h3 className="flex items-center gap-2">
                    Atrasadas{' '}
                    <Badge
                      variant={'outline'}
                      className="size-6 items-center justify-center rounded-full border-primary"
                    >
                      {overdue.length}
                    </Badge>
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <TaskList
                    items={overdue}
                    labels={labels}
                    projects={projects}
                  />
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
          {Object.keys(group).map((day) => {
            return (
              <Accordion key={day} type="single" collapsible>
                <AccordionItem value={day}>
                  <AccordionTrigger>
                    <div className="flex gap-1">
                      <span className="capitalize">
                        {format(day, 'dd MMMM yyyy', { locale: ptBR })}
                      </span>
                      <Dot />
                      <span className="capitalize">
                        {format(day, 'EEEE', { locale: ptBR })}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <TaskList
                      items={group[day]}
                      labels={labels}
                      projects={projects}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          })}
        </main>
      </ScrollArea>
      <PopoverCreateTask labels={labels} projects={projects} userId={userId} />
    </div>
  )
}

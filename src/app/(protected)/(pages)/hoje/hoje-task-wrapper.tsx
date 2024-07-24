import { PopoverCreateTask } from '@/components/task/popover-create-task'
import { TaskHeader } from '@/components/task/task-header'
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
import { getOverdueTask, getTodayTask } from '@/lib/data/task'

interface HojeTaskWrapperProps {
  title: string
  userId: string
}
export async function HojeTaskWrapper({ userId, title }: HojeTaskWrapperProps) {
  const [overdue, today] = await Promise.all([
    getOverdueTask(userId),
    getTodayTask(userId),
  ])
  const [labels, projects] = await Promise.all([
    getLabels(userId),
    getProjects(userId),
  ])
  return (
    <div className="relative flex w-full flex-1 flex-col space-y-3 bg-secondary px-3 py-16 md:px-6">
      <TaskHeader title={title} />
      <ScrollArea>
        <main className="mx-auto h-full w-full space-y-3 md:max-w-4xl">
          <TaskList items={today} labels={labels} projects={projects} />
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
        </main>
      </ScrollArea>
      <PopoverCreateTask labels={labels} projects={projects} userId={userId} />
    </div>
  )
}

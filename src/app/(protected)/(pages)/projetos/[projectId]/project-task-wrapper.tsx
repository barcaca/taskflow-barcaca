import { FormDeleteProject } from '@/components/project/form-delete-project'
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
import {
  getTaskCompleteByProjectId,
  getTaskIncompleteByProjectId,
} from '@/lib/data/task'

interface ProjectTaskWrapperProps {
  title: string
  userId: string
  projectId: string
}
export async function ProjectTaskWrapper({
  userId,
  title,
  projectId,
}: ProjectTaskWrapperProps) {
  const [completed, incompleted] = await Promise.all([
    getTaskCompleteByProjectId(userId, projectId),
    getTaskIncompleteByProjectId(userId, projectId),
  ])
  const [labels, projects] = await Promise.all([
    getLabels(userId),
    getProjects(userId),
  ])
  return (
    <div className="relative flex w-full flex-1 flex-col space-y-3 bg-secondary px-3 py-16 md:px-6">
      <div className="relative mx-auto flex w-full items-center justify-between md:max-w-4xl">
        <TaskHeader title={title} />
        {title !== 'Projeto Inicial' && (
          <FormDeleteProject
            userId={userId}
            projectId={projectId}
            projectName={title}
          />
        )}
      </div>
      <ScrollArea>
        <main className="mx-auto h-full w-full space-y-3 md:max-w-4xl">
          <TaskList items={incompleted} labels={labels} projects={projects} />
          <Accordion type="single" collapsible>
            {completed.length > 0 && (
              <AccordionItem value="completed">
                <AccordionTrigger>
                  <h3 className="flex items-center gap-2">
                    Completo{' '}
                    <Badge
                      variant={'outline'}
                      className="size-6 items-center justify-center rounded-full border-primary"
                    >
                      {completed.length}
                    </Badge>
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                  <TaskList
                    items={completed}
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

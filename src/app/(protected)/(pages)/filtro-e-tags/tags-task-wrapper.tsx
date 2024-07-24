import { ModalFormTags } from '@/components/tags/modal-form-tags'
import { PopoverCreateTask } from '@/components/task/popover-create-task'
import { TaskList } from '@/components/task/task-list'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getLabels } from '@/lib/data/labels'
import { getProjects } from '@/lib/data/projetos'
import { getGroupTaskByLabel } from '@/lib/data/task'

interface TagsTaskWrapperProps {
  title: string
  userId: string
}
export async function TagsTaskWrapper({ userId, title }: TagsTaskWrapperProps) {
  const group = await getGroupTaskByLabel(userId)

  const [labels, projects] = await Promise.all([
    getLabels(userId),
    getProjects(userId),
  ])
  return (
    <div className="relative flex w-full flex-1 flex-col space-y-3 bg-secondary px-3 py-16 md:px-6">
      <header className="mx-auto flex w-full justify-between md:max-w-4xl">
        <h2 className="text-2xl">{title}</h2>
        <ModalFormTags userId={userId} />
      </header>
      <ScrollArea>
        <main className="mx-auto h-full w-full space-y-3 md:max-w-4xl">
          {Object.keys(group).map((label) => {
            return (
              <Accordion key={label} type="single" collapsible>
                <AccordionItem value={label}>
                  <AccordionTrigger>
                    <div className="flex gap-1">
                      <span className="capitalize">{label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <TaskList
                      items={group[label]}
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

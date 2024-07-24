import { z } from 'zod'

export const FormSchema = z.object({
  taskName: z.string().min(2),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date(),
  projectId: z.string().min(1),
  labelId: z.string().min(1),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
})

export const EditTaskSchema = FormSchema

export type TEditTaskData = z.infer<typeof EditTaskSchema>

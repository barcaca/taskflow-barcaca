import { z } from 'zod'

export const FormSchema = z.object({
  taskName: z.string().min(2),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date(),
  projectId: z.string().min(1),
  labelId: z.string().min(1),
  parentId: z.string().optional(),
  startAt: z.string().optional(),
  endAt: z.string().optional(),
})

export const CreateTaskSchema = FormSchema

export type TCreateTaskData = z.infer<typeof CreateTaskSchema>

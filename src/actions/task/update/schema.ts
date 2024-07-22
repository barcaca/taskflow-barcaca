import { z } from 'zod'

export const FormSchema = z.object({
  isCompleted: z.string(),
})

export const CompletedTaskSchema = FormSchema

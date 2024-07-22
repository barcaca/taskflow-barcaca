import { z } from 'zod'
export const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'Preciso de ao menos 1 character',
  }),
})

export const CreateProjectSchema = FormSchema

export type TCreateProjectData = z.infer<typeof CreateProjectSchema>

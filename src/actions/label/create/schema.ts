import { z } from 'zod'
export const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'Preciso de ao menos 1 character',
  }),
})

export const CreateLabelSchema = FormSchema

export type TCreateLabelData = z.infer<typeof CreateLabelSchema>

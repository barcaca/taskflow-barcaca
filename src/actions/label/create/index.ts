'use server'

import { Type } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { State } from '@/lib/custom-toast'
import { getUser } from '@/lib/data/user'
import db from '@/lib/db'

import { CreateLabelSchema, TCreateLabelData } from './schema'

export async function createLabelAction(
  userId: string,
  formData: TCreateLabelData,
): Promise<State> {
  const validationFileds = CreateLabelSchema.safeParse(formData)
  if (!validationFileds.success) {
    return { message: 'Formulário inválido.', status: 400 }
  }
  const user = await getUser()
  if (!user) {
    return { message: 'Não foi possível buscar o usuário.', status: 500 }
  }
  if (user.id !== userId) {
    return {
      message: 'Você não tem permissão para realizar esta ação.',
      status: 403,
    }
  }
  const { name } = validationFileds.data

  const type = Type.user

  const data = {
    name,
    userId,
    type,
  }
  try {
    await db.label.create({
      data,
    })
    revalidatePath('/')
    return { message: 'Tag criado com sucesso.', status: 200 }
  } catch (error) {
    return { message: 'Falha ao tentar criar o tag.', status: 500 }
  }
}

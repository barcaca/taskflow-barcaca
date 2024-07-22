'use server'

import { revalidatePath } from 'next/cache'

import { State } from '@/lib/custom-toast'
import { getUser } from '@/lib/data/user'
import db from '@/lib/db'

import { CompletedTaskSchema } from './schema'

export async function updateTaskAction(
  userId: string,
  taskId: string,
  formData: FormData,
): Promise<State> {
  const validatedFields = CompletedTaskSchema.safeParse({
    isCompleted: formData.get('isCompleted'),
  })
  if (!validatedFields.success) {
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
  const { isCompleted } = validatedFields.data
  const toggleCompleted = isCompleted === 'true'
  try {
    await db.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: {
        isCompleted: !toggleCompleted,
      },
    })
    revalidatePath('/correio')
    if (toggleCompleted) {
      return { message: 'Tarefa reativada', status: 200 }
    }
    return { message: 'Tarefa concluida', status: 200 }
  } catch (error) {
    return { message: 'Não foi possível atualizar a tarefa.', status: 500 }
  }
}

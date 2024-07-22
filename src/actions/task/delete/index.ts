'use server'
import { revalidatePath } from 'next/cache'

import { State } from '@/lib/custom-toast'
import { getUser } from '@/lib/data/user'
import db from '@/lib/db'

export async function deleteTaskAction(
  userId: string,
  taskId: string,
): Promise<State> {
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
  try {
    await db.task.delete({
      where: {
        id: taskId,
        userId,
      },
    })
    revalidatePath('/')
    return { message: 'Tarefa excluída com sucesso.', status: 200 }
  } catch (error) {
    console.error('Erro ao excluir a tarefa:', error)
    return {
      message: 'Ocorreu um erro ao excluir a tarefa.',
      status: 500,
    }
  }
}

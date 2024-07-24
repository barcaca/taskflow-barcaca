'use server'

import { revalidatePath } from 'next/cache'

import { State } from '@/lib/custom-toast'
import { getUser } from '@/lib/data/user'
import db from '@/lib/db'

import { EditTaskSchema, TEditTaskData } from './schema'

export async function editTaskAction(
  userId: string,
  taskId: string,
  formData: TEditTaskData,
): Promise<State> {
  const validationFileds = EditTaskSchema.safeParse(formData)
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
  const { priority, taskName, dueDate, projectId, labelId, endAt, startAt } =
    validationFileds.data

  const data = {
    priority,
    taskName,
    dueDate,
    projectId,
    labelId,
    endAt: endAt || null,
    startAt: startAt || null,
  }

  try {
    await db.task.update({
      where: {
        id: taskId,
        userId,
      },
      data,
    })
    revalidatePath('/correio', 'page')
    return { message: 'Tarefa atualizada com sucesso.', status: 200 }
  } catch (error) {
    return { message: 'Não foi possível atualizar a tarefa.', status: 500 }
  }
}

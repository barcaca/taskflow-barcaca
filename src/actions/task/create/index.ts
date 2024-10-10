'use server'

import { revalidatePath } from 'next/cache'

import { State } from '@/lib/custom-toast'
import { getUser } from '@/lib/data/user'
import db from '@/lib/db'

import { CreateTaskSchema, TCreateTaskData } from './schema'

export async function createTaskAction(
  userId: string,
  formData: TCreateTaskData,
): Promise<State> {
  const validationFileds = CreateTaskSchema.safeParse(formData)
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
  const { dueDate, labelId, priority, projectId, taskName, endAt, startAt } =
    validationFileds.data
  const data = {
    taskName,
    dueDate,
    labelId,
    priority,
    projectId,
    userId,
    startAt: startAt || null,
    endAt: endAt || null,
  }

  try {
    await db.task.create({
      data,
    })
    revalidatePath('/')
    return { message: 'Tarefa criada com sucesso.', status: 201 }
  } catch (error) {
    return { message: String(error), status: 500 }
  }
}

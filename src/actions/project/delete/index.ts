'use server'
import { revalidatePath } from 'next/cache'

import { State } from '@/lib/custom-toast'
import { getUser } from '@/lib/data/user'
import db from '@/lib/db'

export async function deleteProjectAction(
  userId: string,
  projectId: string,
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
    const project = await db.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      return { message: 'Projeto não encontrado.', status: 404 }
    }

    if (project.type === 'system') {
      return {
        message: 'Projetos do tipo "system" não podem ser excluídos.',
        status: 403,
      }
    }
    await db.$transaction(async (prisma) => {
      await prisma.task.deleteMany({
        where: {
          projectId,
          userId,
        },
      })
      await prisma.project.delete({
        where: {
          id: projectId,
          userId,
        },
      })
    })
    revalidatePath('/')
    return { message: 'Projeto e tarefas excluídos com sucesso.', status: 200 }
  } catch (error) {
    console.error('Erro ao excluir o projeto e as tarefas:', error)
    return {
      message: 'Ocorreu um erro ao excluir o projeto e as tarefas.',
      status: 500,
    }
  }
}

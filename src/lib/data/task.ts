import { cache } from 'react'

import db from '../db'

async function fetchTaskCompleted(userId: string) {
  try {
    const tasks = await db.task.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      orderBy: {
        dueDate: 'asc',
      },
    })
    return tasks
  } catch (error) {
    console.error('Falha ao buscar tarefas concluídas:', error)
    throw new Error('Falha ao buscar tarefas concluídas.')
  }
}

export const getTaskCompleted = cache(fetchTaskCompleted)

async function fetchTaskIncomplete(userId: string) {
  try {
    const tasks = await db.task.findMany({
      where: {
        userId,
        isCompleted: false,
      },
      orderBy: {
        dueDate: 'asc',
      },
    })
    return tasks
  } catch (error) {
    console.error('Falha ao buscar tarefas incompletas:', error)
    throw new Error('Falha ao buscar tarefas incompletas.')
  }
}

export const getTaskIncomplete = cache(fetchTaskIncomplete)

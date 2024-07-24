import { Task } from '@prisma/client'
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

async function fetchTodayTask(userId: string) {
  const today = new Date()
  const todayStart = new Date(today.setHours(0, 0, 0, 0)) // Início do dia, meia-noite
  const todayEnd = new Date(todayStart)
  todayEnd.setDate(todayEnd.getDate() + 1) // Adiciona um dia
  todayEnd.setMilliseconds(todayEnd.getMilliseconds() - 1) // Um milissegundo antes da meia-noite do próximo dia 4 * 60 * 60 * 1000 // 24 hours
  try {
    const tasksToday = await db.task.findMany({
      where: {
        userId,
        dueDate: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    })
    return tasksToday
  } catch (error) {
    console.error('Falha ao buscar tarefas do dia:', error)
    throw new Error('Falha ao buscar tarefas do dia.')
  }
}

export const getTodayTask = cache(fetchTodayTask)

async function fetchOverdueTask(userId: string) {
  try {
    const today = new Date()
    const todayStart = new Date(today.setHours(0, 0, 0, 0)) // Início do dia, meia-noite
    const taskOverdue = await db.task.findMany({
      where: {
        userId,
        dueDate: {
          lt: todayStart,
        },
        isCompleted: false,
      },
      orderBy: {
        dueDate: 'asc',
      },
    })
    return taskOverdue
  } catch (error) {
    console.error('Falha ao buscar tarefas vencidas:', error)
    throw new Error('Falha ao buscar tarefas vencidas.')
  }
}

export const getOverdueTask = cache(fetchOverdueTask)

async function fetchGroupTaskByDate(userId: string) {
  const today = new Date()
  const todayStart = new Date(today.setHours(0, 0, 0, 0))
  try {
    const tasks = await db.task.findMany({
      where: {
        userId,
        dueDate: {
          gte: todayStart,
        },
        isCompleted: false,
      },
      orderBy: {
        dueDate: 'asc',
      },
    })
    const groupeTask = tasks.reduce<{ [key: string]: Task[] }>((acc, task) => {
      const day = new Date(task.dueDate).toDateString()
      acc[day] = (acc[day] || []).concat(task)
      return acc
    }, {})

    return groupeTask
  } catch (error) {
    console.error('Falha ao agrupar tarefas por data:', error)
    throw new Error('Falha ao agrupar tarefas por data.')
  }
}

export const getGroupTaskByDate = cache(fetchGroupTaskByDate)

async function fetchGroupTaskByLabel(userId: string) {
  try {
    const tasks = await db.task.findMany({
      where: {
        userId,
        isCompleted: false,
      },
      orderBy: {
        dueDate: 'asc',
      },
      include: {
        label: {
          select: {
            name: true,
          },
        },
      },
    })
    const groupeTask = tasks.reduce<{ [key: string]: Task[] }>((acc, task) => {
      const labelName = task.label.name
      acc[labelName] = (acc[labelName] || []).concat(task)
      return acc
    }, {})
    return groupeTask
  } catch (error) {
    console.error('Falha ao agrupar tarefas por etiqueta:', error)
    throw new Error('Falha ao agrupar tarefas por etiqueta.')
  }
}

export const getGroupTaskByLabel = cache(fetchGroupTaskByLabel)

async function fetchTaskIncompleteByProjectId(
  userId: string,
  projectId: string,
) {
  try {
    const task = await db.task.findMany({
      where: {
        userId,
        projectId,
        isCompleted: false,
      },
    })
    return task
  } catch (error) {
    console.error('Falha ao buscar projetos:', error)
    throw new Error('Falha ao buscar projetos.')
  }
}

export const getTaskIncompleteByProjectId = cache(
  fetchTaskIncompleteByProjectId,
)
async function fetchTaskCompleteByProjectId(userId: string, projectId: string) {
  try {
    const task = await db.task.findMany({
      where: {
        userId,
        projectId,
        isCompleted: true,
      },
    })
    return task
  } catch (error) {
    console.error('Falha ao buscar projetos:', error)
    throw new Error('Falha ao buscar projetos.')
  }
}

export const getTaskCompleteByProjectId = cache(fetchTaskCompleteByProjectId)

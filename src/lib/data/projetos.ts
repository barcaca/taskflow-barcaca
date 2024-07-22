import { Project } from '@prisma/client'
import { cache } from 'react'

import db from '../db'

async function fetchProjects(userId: string): Promise<Project[]> {
  try {
    const projects = await db.project.findMany({
      where: {
        OR: [{ userId }, { type: 'system' }],
      },
    })
    return projects
  } catch (error) {
    console.error('Error fetching user project:', error)
    throw error
  }
}

export const getProjects = cache(fetchProjects)

async function fetchProjectsWithId(userId: string): Promise<Project[]> {
  try {
    const projects = await db.project.findMany({
      where: {
        OR: [{ userId }, { type: 'system' }],
      },
    })
    return projects
  } catch (error) {
    console.error('Falha ao buscar projetos:', error)
    throw new Error('Falha ao buscar projetos.')
  }
}

export const getProjectsWithId = cache(fetchProjectsWithId)

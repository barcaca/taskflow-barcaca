import { Label } from '@prisma/client'
import { cache } from 'react'

import db from '../db'

async function fetchLabels(userId: string): Promise<Label[]> {
  try {
    const labels = await db.label.findMany({
      where: {
        OR: [{ userId }, { type: 'system' }],
      },
    })
    return labels
  } catch (error) {
    console.error('Falha ao buscar labels:', error)
    throw new Error('Falha ao buscar labels.')
  }
}

export const getLabels = cache(fetchLabels)

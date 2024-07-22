import { User } from 'next-auth'

import { auth } from '@/auth'

/**
 * Fetches the user information from the authenticated session.
 *
 * @remarks
 * This function is used to retrieve the user information from the NextAuth.js session.
 * It attempts to fetch the session and return the user object if available.
 * If the session is not available or an error occurs during the fetch, it returns `null`.
 *
 * @returns A Promise that resolves to the user object if available, or `null` if the session is not available or an error occurs.
 */

async function fetchUser(): Promise<User | null> {
  try {
    const session = await auth()
    if (!session?.user) return null
    const user = session.user
    return user
  } catch (error) {
    console.error('Falha ao buscar usuário:', error)
    throw new Error('Falha ao buscar usuário.')
  }
}

export const getUser = fetchUser

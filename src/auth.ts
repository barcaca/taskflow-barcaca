import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import db from '@/lib/db'

import authConfig from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  pages: {
    signIn: '/',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
})

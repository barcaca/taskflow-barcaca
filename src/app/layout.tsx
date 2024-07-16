import '@/styles/globals.css'

import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { poppins, raleway } from '@/fonts/fonts'

import { Provider } from './provider'

export const metadata: Metadata = {
  title: 'TaskFlow',
  description:
    'TaskFlow is a task management application designed to help you organize and prioritize your tasks efficiently.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${raleway.variable} h-full`}
    >
      <body className="relative flex h-full min-h-screen flex-col bg-background antialiased">
        <SessionProvider session={session}>
          <Provider>
            {children}
            <Footer />
            <Toaster richColors position="top-center" />
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}

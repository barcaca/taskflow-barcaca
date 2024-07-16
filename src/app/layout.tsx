import '@/styles/globals.css'

import type { Metadata } from 'next'

import { poppins, raleway } from '@/fonts/fonts'

import { Provider } from './provider'

export const metadata: Metadata = {
  title: 'TaskFlow',
  description:
    'TaskFlow is a task management application designed to help you organize and prioritize your tasks efficiently.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${raleway.variable}`}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}

import { ReactNode } from 'react'

import { getUser } from '@/lib/data/user'

import { SidebarWrapper } from './_components/sidebar/sidebar-wrapper'

export default async function LayoutProtected({
  children,
}: {
  children: ReactNode
}) {
  const user = await getUser()
  return (
    <div className="flex h-[calc(100%_-_90px)] w-full">
      <SidebarWrapper userId={user?.id as string} />
      {children}
    </div>
  )
}

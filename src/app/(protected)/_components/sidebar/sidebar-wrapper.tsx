import { getProjectsWithId } from '@/lib/data/projetos'

import { LogOut } from './log-out'
import { Logo } from './logo'
import { Profile } from './profile'
import { SidebarMenu } from './sidebar-menu'

interface SidebarWrapperProps {
  userId: string
}

export async function SidebarWrapper({ userId }: SidebarWrapperProps) {
  const projetos = await getProjectsWithId(userId)
  return (
    <aside className="flex h-full w-16 flex-col gap-y-3 border-r border-primary bg-background py-3 md:w-72 md:gap-y-6">
      <Logo />
      <Profile />
      <SidebarMenu title="Geral" />
      <SidebarMenu
        title="Projetos"
        isProject
        userId={userId}
        items={projetos}
      />
      <LogOut />
    </aside>
  )
}

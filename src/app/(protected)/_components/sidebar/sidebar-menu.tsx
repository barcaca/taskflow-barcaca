'use client'
import { Project } from '@prisma/client'

import { ModalForm } from '@/components/project/modal-form'

import { links } from './link-data'
import { SidebarMenuItems } from './sidebar-menu-items'

export interface ItemLink {
  name: string
  href: string
  icon?: React.ElementType
}

interface SidebarMenuProps {
  title: string
  isProject?: boolean
  items?: ItemLink[] | Project[]
  userId?: string
}

export function SidebarMenu({
  title,
  isProject,
  items,
  userId,
}: SidebarMenuProps) {
  return (
    <nav
      className={`${isProject ? 'overflow-y-auto overflow-x-hidden' : ''} flex w-full flex-col items-center gap-1 px-3`}
    >
      <div className="mb-2 mr-auto w-full items-center justify-center md:flex md:justify-between">
        <span className="text-xs text-muted-foreground">{title}</span>
        {isProject && <ModalForm userId={userId as string} />}
      </div>
      {items ? (
        <SidebarMenuItems items={items} />
      ) : (
        <SidebarMenuItems items={links} />
      )}
    </nav>
  )
}

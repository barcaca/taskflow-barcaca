import { Project } from '@prisma/client'
import { HashIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { ItemLink } from './sidebar-menu'

interface SidebarMenuItemsProps {
  items: ItemLink[] | Project[]
}

export function SidebarMenuItems({ items }: SidebarMenuItemsProps) {
  const pathname = usePathname()
  return (
    <>
      {items.map((link) => {
        const { icon: Icon } = link as ItemLink
        const isProject = (item: ItemLink | Project): item is Project => {
          return !(item as ItemLink).icon
        }
        const id = isProject(link) ? `/projetos/${link.id}` : link.href
        return (
          <Link
            key={link.name}
            href={id}
            className={cn(
              buttonVariants({
                variant: pathname === id ? 'default' : 'ghost',
              }),
              `flex min-w-full items-center justify-center gap-3 px-2 md:justify-start ${pathname === id ? '' : 'text-muted-foreground'}`,
            )}
          >
            {Icon ? (
              <>
                <Icon className="size-6" />
              </>
            ) : (
              <>
                <HashIcon className="size-6" />
                <span className="sr-only">{link.name}</span>
              </>
            )}
            <span className="hidden md:inline-block">{link.name}</span>
          </Link>
        )
      })}
    </>
  )
}

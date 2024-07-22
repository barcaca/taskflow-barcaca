import {
  CalendarRangeIcon,
  CalendarXIcon,
  InboxIcon,
  TagsIcon,
} from 'lucide-react'

export const links = [
  {
    name: 'Correio',
    href: '/correio',
    icon: InboxIcon,
  },
  {
    name: 'Hoje',
    href: '/hoje',
    icon: CalendarXIcon,
  },
  {
    name: 'Próximos',
    href: '/proximos',
    icon: CalendarRangeIcon,
  },
  {
    name: 'Tags',
    href: '/filtro-e-tags',
    icon: TagsIcon,
  },
]

import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'

const featuresItems = [
  {
    icon: <Icons.nextjs />,
    title: 'Next.js 14',
  },
  {
    icon: <Icons.prisma />,
    title: 'Prisma',
  },
  {
    icon: <Icons.supabase />,
    title: 'Supabase',
  },
  {
    icon: <Icons.tailwindcss />,
    title: 'TailwindCSS',
  },
  {
    icon: <Icons.shadcn />,
    title: 'Shadcn',
  },
  {
    icon: <Icons.nextauth />,
    title: 'AuthJs',
  },
]

export function Technology() {
  return (
    <div className="grid max-w-screen-lg grid-flow-row auto-rows-max grid-cols-3 gap-4">
      {featuresItems.map((item) => {
        return (
          <Badge
            key={item.title}
            variant={'outline'}
            className="flex-col gap-1 p-3 shadow-sm"
          >
            {item.icon}
          </Badge>
        )
      })}
    </div>
  )
}

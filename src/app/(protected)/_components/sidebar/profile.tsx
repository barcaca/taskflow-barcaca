import Image from 'next/image'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { getUser } from '@/lib/data/user'

export async function Profile() {
  const user = await getUser()

  if (!user) {
    return (
      <div className="flex items-center justify-center gap-3 px-3">
        <Avatar className="size-8">
          <AvatarFallback>
            <Skeleton className="size-8" />
          </AvatarFallback>
        </Avatar>
        <div className="hidden h-full w-full flex-col items-center justify-center gap-1 md:flex">
          <Skeleton className="h-3.5 w-3/4"></Skeleton>
          <Skeleton className="h-3 w-full"></Skeleton>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center px-3 md:justify-start md:gap-3">
      <Avatar className="size-8">
        <Image
          src={user.image as string}
          alt="avatar usuário"
          referrerPolicy="no-referrer"
          width={32}
          height={32}
          className="h-auto w-auto"
        />
      </Avatar>
      <div className="hidden flex-col md:flex">
        <span className="text-sm">{user.name}</span>
        <span className="text-xs text-muted-foreground">{user.email}</span>
      </div>
    </div>
  )
}

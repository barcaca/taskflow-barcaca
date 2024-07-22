import { DotIcon } from 'lucide-react'

import { Skeleton } from '../ui/skeleton'

export function TaskWrapperSkeleton() {
  return (
    <div className="mx-auto h-full w-full space-y-3 overflow-y-auto md:max-w-4xl">
      <Skeleton className="h-8 w-40 bg-muted-foreground" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-28 bg-muted-foreground" />
        <DotIcon />
        <Skeleton className="h-6 w-28 bg-muted-foreground" />
      </div>
      <div className="w-full flex-1 space-y-3">
        {[...Array(10)].map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="flex h-12 w-full items-center justify-between bg-muted-foreground p-3"
            >
              <div className="flex items-center justify-center gap-2">
                <Skeleton className="size-8" />
                <Skeleton className="h-6 w-24 md:w-44" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <Skeleton className="size-8" />
                <Skeleton className="size-8" />
              </div>
            </Skeleton>
          )
        })}
      </div>
    </div>
  )
}

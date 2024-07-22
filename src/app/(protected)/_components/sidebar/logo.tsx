import { Icons } from '@/components/icons'

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-3 px-3 md:justify-start">
      <div>
        <Icons.logo className="size-8 text-primary" />
      </div>
      <strong className="hidden uppercase md:block">TaskFlow</strong>
    </div>
  )
}

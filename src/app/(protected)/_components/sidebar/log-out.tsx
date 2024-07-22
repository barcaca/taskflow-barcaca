import { MinusCircleIcon } from 'lucide-react'

import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'

export function LogOut() {
  async function logOut() {
    'use server'
    await signOut()
  }
  return (
    <form className="mt-auto px-3" action={logOut}>
      <Button
        variant={'ghost'}
        size={'sm'}
        className="flex min-w-full items-center justify-center gap-3 px-2 text-muted-foreground md:justify-start"
      >
        <MinusCircleIcon size={24} className="size-6" />
        <span className="hidden md:inline-block">Sair</span>
      </Button>
    </form>
  )
}

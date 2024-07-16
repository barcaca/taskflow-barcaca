'use client'
import { signIn } from 'next-auth/react'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes/routes'

const providersItems = [
  {
    icon: <Icons.google className="size-6" />,
    label: 'Google',
    value: 'google',
  },
  {
    icon: <Icons.gitHub className="size-6" />,
    label: 'GitHub',
    value: 'github',
  },
  {
    icon: <Icons.linkedin className="size-6" />,
    label: 'Linkedin',
    value: 'linkedin',
  },
  {
    icon: <Icons.x className="size-6" />,
    label: 'Twitter',
    value: 'x',
  },
]
export function Socials() {
  function handleProvider(provider: string) {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {providersItems.map((item) => {
        return (
          <Button
            key={item.label}
            variant={'outline'}
            className="gap-4 drop-shadow-sm"
            onClick={() => handleProvider(item.value)}
            disabled={item.value === 'x' || item.value === 'linkedin'}
          >
            {item.icon}
            <span className="text-start text-sm font-semibold leading-6">
              Inscreva-se com {item.label}
            </span>
          </Button>
        )
      })}
    </div>
  )
}

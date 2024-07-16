'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const themeItems = [
  {
    label: 'Light',
    value: 'light',
    icon: <Sun className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: <Moon className="h-[1.2rem] w-[1.2rem]" />,
  },
  {
    label: 'System',
    value: 'system',
    icon: <Monitor className="h-[1.2rem] w-[1.2rem]" />,
  },
]

/**
 * A functional component that renders a theme toggle button.
 * It uses the `useTheme` hook from `next-themes` to manage the theme state.
 * The button switches between a sun and moon icon, indicating the current theme.
 * The component also includes a loading state using the `Skeleton` component.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Effect to set the `mounted` state to true when the component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render the loading state if the component is not yet mounted
  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-2 md:order-2 md:items-end">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="size-9 rounded-full" />
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-center gap-2 md:order-2 md:items-end"
      aria-label="Select a theme"
    >
      {themeItems.map((item) => {
        return (
          <Button
            key={item.label}
            variant={theme === item.value ? 'outline' : 'ghost'}
            size="icon"
            onClick={() => setTheme(item.value)}
            aria-label="Toggle theme"
            className={`${theme === item.value ? 'border-2 border-primary' : ''} rounded-full`}
          >
            {item.icon}
          </Button>
        )
      })}
    </div>
  )
}

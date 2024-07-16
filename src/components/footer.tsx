import { ThemeToggle } from '@/components/theme/theme-toggle'

export function Footer() {
  return (
    <footer className="sticky bottom-0 flex h-[90px] w-full border-t bg-background">
      <div className="w-full px-6 py-3 md:flex md:items-center md:justify-between md:py-6 lg:px-8">
        <ThemeToggle />
        <div className="mt-2 md:order-1 md:mt-0">
          <p className="text-center text-xs text-muted-foreground md:text-start">
            © 2024 Luan Barcaça. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

import { Login } from '@/components/home/login'
import { Technology } from '@/components/home/technology'
import { Icons } from '@/components/icons'

export default function Home() {
  return (
    <div className="relative flex h-screen w-screen">
      <aside className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="absolute left-2 top-5 flex items-center gap-2 lg:left-5">
          <Icons.logo className="size-12 text-primary" />
          <p className="font-medium uppercase">TaskFlow</p>
        </div>
        <Login />
      </aside>
      <main className="hidden h-full w-1/2 flex-col rounded-md border-l p-10 lg:flex">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h2 className="font-heading text-5xl leading-[1.1]">
            Características
          </h2>
          <p className="min-w-xs mx-auto max-w-screen-sm text-center text-muted-foreground">
            <strong>TaskFlow:</strong> Projeto fictício para aprender{' '}
            <strong>Next.js</strong>, <strong>Prisma</strong>,{' '}
            <strong>AuthJs</strong>, <strong>CRUD</strong>. Explora
            autenticação, Server Actions, páginas estáticas e operações de
            dados.
          </p>
          <Technology />
        </div>
      </main>
    </div>
  )
}

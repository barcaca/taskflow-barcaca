import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Dot } from 'lucide-react'

export function TaskHeader({ title }: { title: string }) {
  return (
    <header className="mx-auto w-full md:max-w-4xl">
      <h2 className="text-2xl">{title}</h2>
      <div className="flex gap-1">
        <span className="capitalize">
          {format(new Date(), 'dd MMMM yyyy', { locale: ptBR })}
        </span>
        <Dot />
        <span className="capitalize">
          {format(new Date(), 'EEEE', { locale: ptBR })}
        </span>
      </div>
    </header>
  )
}

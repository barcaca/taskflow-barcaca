import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Badge } from '@/components/ui/badge'

interface BadgeTaskProps {
  dueDate?: Date
  isStartAt?: string
  isEndAt?: string
  srOnly?: boolean
}

export function BadgeTask({
  dueDate,
  isStartAt,
  isEndAt,
  srOnly,
}: BadgeTaskProps) {
  return (
    <div
      className={`${srOnly ? 'right-2' : 'right-0.5'} absolute !m-0 flex items-end gap-1`}
    >
      <Badge
        className={`${dueDate ? 'translate-x-0 opacity-100' : 'invisible translate-x-14 opacity-0'} !m-0 h-[22px] w-[50px] px-1 py-0.5 text-xs capitalize transition-all duration-700 ease-in-out`}
      >
        {dueDate && format(dueDate, 'dd MMM', { locale: ptBR })}
      </Badge>
      <Badge
        className={`${isStartAt ? 'translate-x-0 opacity-100' : 'invisible absolute translate-x-full opacity-0'} !m-0 h-[22px] px-1 py-0.5 text-xs capitalize transition-all duration-700 ease-in-out`}
      >
        {isStartAt &&
          (isEndAt ? (
            <>
              {isStartAt} - {isEndAt}
            </>
          ) : (
            isStartAt
          ))}
      </Badge>
    </div>
  )
}

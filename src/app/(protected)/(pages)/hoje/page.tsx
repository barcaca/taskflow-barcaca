import { getUser } from '@/lib/data/user'

import { HojeTaskWrapper } from './hoje-task-wrapper'

export default async function HojePage() {
  const user = await getUser()
  return <HojeTaskWrapper userId={user?.id as string} title="Hoje" />
}

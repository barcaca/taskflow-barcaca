import { getUser } from '@/lib/data/user'

import { ProximoTaskWrapper } from './proximo-task-wrapper'

export default async function ProximoPage() {
  const user = await getUser()
  return <ProximoTaskWrapper userId={user?.id as string} title="Proximo" />
}

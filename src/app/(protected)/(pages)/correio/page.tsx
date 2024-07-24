import { TaskWrapper } from '@/components/task/task-wrapper'
import { getUser } from '@/lib/data/user'

export default async function CorreioPage() {
  const user = await getUser()
  return <TaskWrapper userId={user?.id as string} title="Correio" />
}

import { getUser } from '@/lib/data/user'

import { TagsTaskWrapper } from './tags-task-wrapper'

export default async function TagsPage() {
  const user = await getUser()
  return <TagsTaskWrapper userId={user?.id as string} title="Tags" />
}

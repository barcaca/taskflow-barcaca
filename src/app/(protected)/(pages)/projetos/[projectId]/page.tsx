import { getProjectNameById } from '@/lib/data/projetos'
import { getUser } from '@/lib/data/user'

import { ProjectTaskWrapper } from './project-task-wrapper'

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string }
}) {
  const projectId = params.projectId
  const user = await getUser()
  const projectName = await getProjectNameById(projectId)
  return (
    <ProjectTaskWrapper
      userId={user?.id as string}
      title={projectName}
      projectId={projectId}
    />
  )
}

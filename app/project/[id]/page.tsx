import { projects } from '../../projects'
import Link from 'next/link'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === parseInt(params.id))

  if (!project) {
    return <div>项目未找到</div>
  }

  return (
    <div>
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; 返回项目列表</Link>
      <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <h3 className="text-xl font-semibold mb-2">使用的技术：</h3>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span key={tech} className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}


import { SmartLink, primaryLink, projectYears } from './project-parts';

/** Compact rows for archived projects: year, name, stack and one link. */
const ArchiveTable = ({ projects }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead className="border-b border-zinc-200 text-xs text-zinc-500">
        <tr>
          <th scope="col" className="py-2 pr-4 font-medium">Year</th>
          <th scope="col" className="py-2 pr-4 font-medium">Project</th>
          <th scope="col" className="hidden py-2 pr-4 font-medium sm:table-cell">Built with</th>
          <th scope="col" className="py-2 font-medium"><span className="sr-only">Link</span></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-100">
        {projects.map((project) => {
          const link = primaryLink(project.links);
          return (
            <tr key={project.name}>
              <td className="py-3 pr-4 tabular-nums text-zinc-500">{projectYears(project)}</td>
              <td className="py-3 pr-4 font-medium text-zinc-900">{project.name}</td>
              <td className="hidden py-3 pr-4 text-zinc-600 sm:table-cell">{project.stack.join(', ')}</td>
              <td className="py-3 text-right">
                {link && (
                  <SmartLink
                    href={link.href}
                    className="rounded font-medium text-zinc-600 transition hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                  >
                    {link.label}
                    <span className="sr-only"> for {project.name}</span>
                  </SmartLink>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default ArchiveTable;

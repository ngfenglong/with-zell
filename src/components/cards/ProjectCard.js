import { Link } from 'react-router-dom';
import { LinkIcon } from '@heroicons/react/20/solid';
import { GitHubIcon } from '../social-link/Icons';

const ProjectCard = ({ project }) => {
  return (
    <div className="hover:bg-slate-100 rounded px-4 py-4">
      <Link to={project.link.href}>
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 ">
          <img src={project.logo} alt="" className="h-8 w-8" unoptimized />
        </div>
        <h2 className="mt-6 text-base font-semibold text-zinc-800">
          <span className="relative z-10">{project.name}</span>
        </h2>
        <p className="relative z-10 mt-2 text-sm text-zinc-600">
          {project.description}
        </p>
      </Link>
      <p className="relative z-10 mt-6 flex flex-col gap-1 text-sm font-medium text-zinc-400 transition">
        {project.link && (
          <Link className="flex flex-row items-center" to={project.link.href}>
            <LinkIcon className="h-6 w-6 flex-none" />
            <span className="ml-2">{project.link.label}</span>
          </Link>
        )}
        {project.github.map((githubLink) => {
          return (
            <Link
              key={githubLink.href}
              className="flex flex-row items-center"
              to={githubLink.href}
            >
              <GitHubIcon className="h-6 w-6 flex-none" />
              <span className="ml-2">{githubLink.label}</span>
            </Link>
          );
        })}
      </p>
    </div>
  );
};

export default ProjectCard;

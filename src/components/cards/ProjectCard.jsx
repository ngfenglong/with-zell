import Link from 'next/link';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { GitHubIcon } from '../social-link/Icons';
import Image from 'next/image';
import Badge from '../badge/badge';

const TechnologyCard = ({ technology }) => {
  return (
    <div className="my-4 flex flex-row gap-1">
      {Object.entries(technology).map(([key, value]) => {
        let bgColor;
        switch (key) {
          case 'frontend':
            bgColor = 'bg-amber-200';
            break;
          case 'backend':
            bgColor = 'bg-blue-200';
            break;
          case 'database':
            bgColor = 'bg-gray-200';
            break;
          default:
            bgColor = 'bg-gray-50';
            break;
        }
        return <Badge key={key} text={value} className={bgColor} />;
      })}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <div className="rounded px-4 py-4 hover:bg-slate-100">
      <Link href={project.link.href}>
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 ">
          <Image
            src={project.logo}
            alt=""
            className="h-8 w-8"
            fill
            unoptimized
          />
        </div>
        <h2 className="mt-6 text-base font-semibold text-zinc-800">
          <span className="relative z-10">{project.name}</span>
        </h2>
        <p className="relative z-10 mt-2 text-sm text-zinc-600">
          {project.description}
        </p>
      </Link>
      {project.technology && <TechnologyCard technology={project.technology} />}
      <p className="relative z-10 mt-6 flex flex-col gap-1 text-sm font-medium text-zinc-400 transition">
        {project.link && (
          <Link className="flex flex-row items-center" href={project.link.href}>
            <GlobeAltIcon className="h-6 w-6 flex-none" />
            <span className="ml-2">{project.link.label}</span>
          </Link>
        )}
        {project.github.map((githubLink) => {
          return (
            <Link
              key={githubLink.href}
              className="flex flex-row items-center"
              href={githubLink.href}
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

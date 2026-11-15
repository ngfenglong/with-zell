import clsx from "clsx";
import { TagList } from "@/components/tag/Tag";
import {
  CardTitleLink,
  ProjectActions,
  ProjectLogo,
  ProjectMeta,
  primaryLink,
} from "./project-parts";

/** Compact card for the Projects grid. */
const ProjectCard = ({ project }) => {
  const linked = Boolean(primaryLink(project.links));
  return (
    <article
      className={clsx(
        "group relative -mx-4 flex gap-4 rounded-2xl p-4 transition duration-200 ease-out",
        linked &&
          "focus-within:ring-2 focus-within:ring-teal-500 hover:bg-white hover:shadow-[0_0_0_1px_rgba(24,24,27,0.06),0_12px_28px_-14px_rgba(24,24,27,0.14)]"
      )}
    >
      <ProjectLogo project={project} />
      <div className="min-w-0 flex-1">
        <h3
          className={clsx(
            "text-base font-semibold text-zinc-900 transition",
            linked && "group-hover:text-teal-700"
          )}
        >
          <CardTitleLink href={primaryLink(project.links)?.href}>
            {project.name}
          </CardTitleLink>
        </h3>
        <ProjectMeta project={project} className="mt-0.5" />
        <p className="mt-2 text-sm leading-6 text-zinc-600">{project.pitch}</p>
        <TagList
          items={project.stack}
          max={3}
          label="Built with"
          className="mt-3"
        />
        <ProjectActions links={project.links} className="mt-4" />
      </div>
    </article>
  );
};

export default ProjectCard;

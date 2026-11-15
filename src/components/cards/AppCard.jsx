import Image from "next/image";
import clsx from "clsx";
import { TagList } from "@/components/tag/Tag";
import {
  CardTitleLink,
  ProjectActions,
  ProjectLogo,
  ProjectMeta,
  primaryLink,
} from "./project-parts";

export const SURFACE =
  "group relative rounded-2xl bg-white ring-1 ring-zinc-900/[0.06] shadow-[0_1px_2px_rgba(24,24,27,0.04),0_4px_12px_-4px_rgba(24,24,27,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-200 ease-out";

/** Hover lift only when the card actually links somewhere. */
export const INTERACTIVE =
  "hover:shadow-[0_0_0_1px_rgba(20,184,166,0.18),0_1px_2px_rgba(24,24,27,0.04),0_12px_28px_-12px_rgba(24,24,27,0.14)] motion-safe:hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-teal-500";

const surface = (project, extra) =>
  clsx(SURFACE, primaryLink(project.links) && INTERACTIVE, extra);

const Heading = ({ project, size = "md", as: Tag = "h3" }) => (
  <div className="flex items-center gap-4">
    <ProjectLogo project={project} size={size} />
    <div>
      <Tag
        className={clsx(
          "font-semibold tracking-tight text-zinc-900 transition",
          primaryLink(project.links) && "group-hover:text-teal-700",
          size === "md" ? "text-lg" : "text-sm"
        )}
      >
        <CardTitleLink href={primaryLink(project.links)?.href}>
          {project.name}
        </CardTitleLink>
      </Tag>
      <ProjectMeta project={project} className="mt-0.5" />
    </div>
  </div>
);

/** Small version for the home page strip. */
const CompactAppCard = ({ project }) => (
  <article className={surface(project, "p-5")}>
    <Heading project={project} size="sm" />
    <p className="mt-3 text-sm leading-6 text-zinc-600">{project.pitch}</p>
  </article>
);

const Details = ({ project }) => (
  <>
    {project.highlight && (
      <p className="text-sm leading-6 text-zinc-600">{project.highlight}</p>
    )}
    <TagList
      items={project.stack}
      max={4}
      label="Built with"
      className="mt-4"
    />
    <ProjectActions links={project.links} className="mt-5" />
  </>
);

/** Large card for the "What I'm building" section. */
const AppCard = ({ project, compact = false }) => {
  if (compact) return <CompactAppCard project={project} />;

  if (project.image) {
    return (
      <article
        className={surface(
          project,
          "grid overflow-hidden lg:grid-cols-[1fr_1.15fr]"
        )}
      >
        <div className="p-6 sm:p-8">
          <Heading project={project} />
          <p className="mb-2 mt-5 text-base leading-7 text-zinc-700">
            {project.pitch}
          </p>
          <Details project={project} />
        </div>
        <div className="flex items-center bg-zinc-50 p-6 sm:p-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-white shadow-lg shadow-zinc-800/10 ring-1 ring-zinc-900/10 transition duration-500 motion-safe:group-hover:-translate-y-1">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={surface(project, "p-6 sm:p-8")}>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <Heading project={project} />
          <p className="mt-5 text-base leading-7 text-zinc-700">
            {project.pitch}
          </p>
        </div>
        <div className="lg:border-l lg:border-zinc-100 lg:pl-10">
          <Details project={project} />
        </div>
      </div>
    </article>
  );
};

export default AppCard;

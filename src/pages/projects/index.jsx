import { useState } from 'react';
import Seo from '@/components/seo/Seo';
import Container from '@/components/container/Container';
import PageIntro from '@/components/page-intro/PageIntro';
import AppCard from '@/components/cards/AppCard';
import ProjectCard from '@/components/cards/ProjectCard';
import ArchiveTable from '@/components/cards/ArchiveTable';
import SectionHeading from '@/components/section-heading/SectionHeading';
import { PROJECTS_PREVIEW_LIMIT } from '@/constants/projects-details';
import { getProjectSections, validateProjects } from '@/util/projects';

const ProjectsPage = ({ building, projects, archive }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, PROJECTS_PREVIEW_LIMIT);
  const hiddenCount = projects.length - visibleProjects.length;

  return (
    <>
      <Seo
        title="Projects"
        description="Things Zell has built: Telegram bots, a Chrome extension, web apps, machine learning and Go tooling."
      />
      <Container className="mt-16 sm:mt-32">
        <PageIntro
          title="Things I've built"
          intro="Most of what I build starts as a small problem in my own week: tracking trades, deciding where to eat, freeing up browser memory. Some stay weekend experiments. A few I keep coming back to."
        />

        {building.length > 0 && (
          <section id="building" aria-labelledby="building-heading" className="scroll-mt-24">
            <SectionHeading id="building-heading" description="The ones I'm working on right now.">
              What I&apos;m building
            </SectionHeading>
            <div className="mt-8 flex flex-col gap-6">
              {building.map((project) => (
                <AppCard key={project.name} project={project} />
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section aria-labelledby="projects-heading" className="mt-24">
            <SectionHeading
              id="projects-heading"
              description="Things I built along the way. Most aren't actively maintained, but they're still here to explore."
            >
              Projects
            </SectionHeading>
            <div className="mt-8 grid gap-x-8 gap-y-4 md:grid-cols-2">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="mt-6 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                Show all {projects.length} projects
              </button>
            )}
          </section>
        )}

        {archive.length > 0 && (
          <section aria-labelledby="archive-heading" className="mt-24">
            <SectionHeading
              id="archive-heading"
              description="Older work I'm no longer maintaining. The code is still up if you're curious."
            >
              Archive
            </SectionHeading>
            <div className="mt-6">
              <ArchiveTable projects={archive} />
            </div>
          </section>
        )}
      </Container>
    </>
  );
};

export async function getStaticProps() {
  validateProjects();
  return {
    props: getProjectSections(),
    // Re-check daily so projects move between sections as months pass.
    revalidate: 86400,
  };
}

export default ProjectsPage;

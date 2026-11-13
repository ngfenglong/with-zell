import Seo from '@/components/seo/Seo';
import Container from '../../components/container/Container';
import PageIntro from '../../components/page-intro/PageIntro';
import ProjectCard from '../../components/cards/ProjectCard';
import { PROJECTS_DETAILS } from '../../constants/projects-details';

const PROJECTS = PROJECTS_DETAILS;

const ProjectsPage = () => {
  return (
    <>
      <Seo
        title="Projects"
        description="Side projects and technical experiments by Zell: Telegram bots, web apps, machine learning and Go tooling."
      />
      <Container className="mt-16 sm:mt-32">
        <PageIntro
          title="Journey through My Development Projects"
          intro={`Each prototype here represents a stepping stone in my tech journey, demonstrating my ongoing growth and learning. Some of these projects are experiments, others works-in-progress, but all reflect my curiosity and ongoing growth as a developer.`}
        ></PageIntro>
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            return <ProjectCard key={project.name} project={project} />;
          })}
        </div>
      </Container>
    </>
  );
};

export default ProjectsPage;

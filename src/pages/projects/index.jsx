import { useEffect } from 'react';
import Container from '../../components/container/Container';
import PageIntro from '../../components/page-intro/PageIntro';
import ProjectCard from '../../components/cards/ProjectCard';
import { PROJECTS_DETAILS } from '../../constants/projects-details';

const PROJECTS = PROJECTS_DETAILS;

const ProjectsPage = () => {
  useEffect(() => {
    document.title = 'WithZell - My Development Projects';
  }, []);
  return (
    <>
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

import { useEffect } from 'react';
import Container from '../../components/container/Container';
import PageIntro from '../../components/page-intro/PageIntro';
import ProjectCard from '../../components/cards/ProjectCard';
import { PROJECTS_DETAILS } from '../../constants/projects-details';

const PROJECTS = PROJECTS_DETAILS;

const ProjectsPage = () => {
  useEffect(() => {
    document.title = 'Zell - Discover My Projects in Progress';
  }, []);
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <PageIntro
          title="My Development Projects - A Glimpse into My Learning Path"
          intro={`Each project here, though a work-in-progress, is a functioning prototype reflecting my journey in the tech world. 
          As I continuously learn and grow, these projects are set to evolve and mature.
          I'm also an advocate for collaborative learning, so if you have any suggestions for improvement, wish to discuss any project in more detail, please feel free to reach out."`}
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

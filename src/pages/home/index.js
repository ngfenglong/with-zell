import { useEffect } from 'react';
import Container from '../../components/container/Container';
import SocialLink from '../../components/social-link/SocialLink';
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
  TwitterIcon,
} from '../../components/social-link/Icons';
import PageIntro from '../../components/page-intro/PageIntro';

const HomePage = () => {
  useEffect(() => {
    document.title =
      'Zell - Software Developer, Dance Enthusiast, and Lifelong Learner';
  }, []);

  return (
    <>
      <Container className="mt-8">
        <PageIntro
          title="Software Developer, Dance Enthusiast, and Lifelong Learner."
          intro={`I'm Zell, a software developer based in Singapore who believes in
            constant learning and growth. My journey has been marked by a focus
            on application development, all the while exploring the endless
            possibilities that new technology brings. Beyond my professional
            work, I find joy in street dance, problem-solving, and the essence
            of computer science theory intrigues me.`}
        >
          <div className="mt-6 flex gap-6">
            <SocialLink
              to="https://twitter.com/Zell_Dev"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              to="https://www.instagram.com/zell1995/"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              to="https://github.com/ngfenglong/"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              to="https://www.linkedin.com/in/ngfenglong/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />

            <SocialLink
              to="https://leetcode.com/zell1502/"
              aria-label="Follow on Leetcode"
              icon={LeetCodeIcon}
            />
          </div>
        </PageIntro>
      </Container>
    </>
  );
};

export default HomePage;

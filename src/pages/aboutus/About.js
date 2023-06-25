import { useEffect } from 'react';
import Container from '../../components/container/Container';
import SocialLink from '../../components/social-link/SocialLink';
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
  MailIcon,
  TwitterIcon,
} from '../../components/social-link/Icons';
import { ABOUT_PICTURE } from '../../constants/assets';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'Zell - About me...';
  }, []);
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5">
              <img
                src={ABOUT_PICTURE}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
              I'm Zell(Feng Long). Software Developer, Dance Enthusiast, and
              Lifelong Learner.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600">
              <p>
                I'm a software developer based in Singapore who believes in
                constant learning and growth. My journey has been marked by a
                focus on application development, all the while exploring the
                endless possibilities that new technology brings. Beyond my
                professional work, I find joy in street dance, problem-solving,
                and the essence of computer science theory intrigues me.
              </p>
              <p>
                I'm a software developer based in Singapore who believes in
                constant learning and growth. My journey has been marked by a
                focus on application development, all the while exploring the
                endless possibilities that new technology brings. Beyond my
                professional work, I find joy in street dance, problem-solving,
                and the essence of computer science theory intrigues me.
              </p>
              <p>
                I'm a software developer based in Singapore who believes in
                constant learning and growth. My journey has been marked by a
                focus on application development, all the while exploring the
                endless possibilities that new technology brings. Beyond my
                professional work, I find joy in street dance, problem-solving,
                and the essence of computer science theory intrigues me.
              </p>
              <p>
                I'm a software developer based in Singapore who believes in
                constant learning and growth. My journey has been marked by a
                focus on application development, all the while exploring the
                endless possibilities that new technology brings. Beyond my
                professional work, I find joy in street dance, problem-solving,
                and the essence of computer science theory intrigues me.
              </p>
              <p>
                I'm a software developer based in Singapore who believes in
                constant learning and growth. My journey has been marked by a
                focus on application development, all the while exploring the
                endless possibilities that new technology brings. Beyond my
                professional work, I find joy in street dance, problem-solving,
                and the essence of computer science theory intrigues me.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <div className="flex flex-col gap-4" role="list">
              <SocialLink href="#" icon={LinkedInIcon}>
                Follow on LinkedIn
              </SocialLink>
              <SocialLink href="#" icon={GitHubIcon}>
                Follow on GitHub
              </SocialLink>
              <SocialLink href="#" icon={InstagramIcon}>
                Follow on Instagram
              </SocialLink>
              <SocialLink href="#" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href="#" icon={LeetCodeIcon}>
                Follow on Leetcode
              </SocialLink>
              <hr className="text-zinc-100" />
              <SocialLink href="mailto:zell_dev@hotmail.com" icon={MailIcon}>
                zell_dev@hotmail.com
              </SocialLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutPage;

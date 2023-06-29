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
import Image from 'next/image';

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
              <Image
                src={ABOUT_PICTURE}
                alt=""
                width="320"
                height="512"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
              I'm Zell (Feng Long), from Singapore - Technologist, Dancer, and
              Lifelong Learner.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600">
              <p>
                My journey into the world of technology started at the age of
                16, when a friend introduced me to HTML and CSS. This was my
                first taste of the transformative power of coding, and I was
                instantly hooked. While pursuing a diploma in Business
                Informatics at Nanyang Polytechnic, I discovered the synergies
                between business and technology, kindling a passion for managing
                and enhancing projects.
              </p>
              <p>
                However, as I pursued my degree in Information Systems at the
                National University of Singapore, my desire to work more
                hands-on with technology was rekindled, leading me down the path
                of a software developer.
              </p>
              <p>
                I truly enjoy the intricate blend of technology, creativity, and
                craftsmanship that software development offers. There's always a
                new puzzle to solve, a new concept to grasp, and new
                technologies to connect. The dynamic nature of this tech world
                keeps me on my toes, constantly sparking my curiosity and
                driving my passion for continuous learning.
              </p>
              <p>
                Beyond the sphere of technology, dance has been a crucial part
                of my life since my polytechnic days. From Popping and Hip Hop
                to learning Breaking, dance brings balance to my life, reminding
                me of the beauty of rhythm and movement. Alongside dance, my
                love for cats, fascination with Japanese culture, and a growing
                appreciation for the Japanese language all contribute to my
                diverse range of interests.
              </p>
              <p>
                I started this blog from my belief in the value of shared
                knowledge. As I navigate through my own tech journey, my goal is
                to document my experiences and share what I've learned, in the
                hope that it might help someone else out there. Whether you're
                interested in tech, dance, or just sharing interesting thoughts,
                I'm always open to making new friends. Let's learn and grow
                together in this incredible journey of life.
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

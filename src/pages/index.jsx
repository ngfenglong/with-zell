import { useEffect, useState } from 'react';
import {Container} from '@/components/container/Container';
import SocialLink from '@/components/social-link/SocialLink';
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
  MediumIcon,
  TwitterIcon,
} from '@/components/social-link/Icons';
import PageIntro from '@/components/page-intro/PageIntro';
import ResumeCard from '@/components/cards/ResumeCard';
import PictureGallery from '@/components/picture-gallery/PictureGallery';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { Client } from '@notionhq/client';
import { WORK_EXPERIENCE_DETAILS } from '@/constants/work-experience-details';
import { EDUCATION_DETAILS } from '@/constants/education-details';
import { GALLERY_PICTURES } from '@/constants/pictures-gallery-details';
import { transformNotionArticleToPost } from '@/util/notion-rendering-helper';

const WORK_EXPERIENCE = WORK_EXPERIENCE_DETAILS;
const EDUCATION_EXPERIENCE = EDUCATION_DETAILS;
const PICTURES = GALLERY_PICTURES;

const HomePage = ({ articlesProp }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    document.title =
      'WithZell - Software Developer, Dance Enthusiast, and Lifelong Learner';

    const mappedArticles = articlesProp
      .map((article) => transformNotionArticleToPost(article))
      .sort((a, b) => {
        return b.posted_date - a.posted_date;
      });
    setArticles(mappedArticles);
  }, [articlesProp]);

  return (
    <>
      <Container className="mt-8">
        <PageIntro
          title="Software Developer, Dancer, and Lifelong Learner."
          intro={`I'm Zell (Feng Long), a software developer based in Singapore who believes in
            constant learning and growth. My journey has been marked by a focus
            on application development, all the while exploring the endless
            possibilities that new technology brings. Beyond my professional
            work, I find joy in street dance, problem-solving, and the essence
            of computer science theory intrigues me.`}
        >
          <div className="mt-4 flex gap-6">
            <SocialLink
              href="https://www.linkedin.com/in/ngfenglong/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="https://github.com/ngfenglong/"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.instagram.com/tech.withzell/"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://twitter.com/Zell_Dev"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://leetcode.com/zell_dev/"
              aria-label="Follow on Leetcode"
              icon={LeetCodeIcon}
            />
            <SocialLink
              href="https://medium.com/@zell_dev"
              aria-label="Follow on Medium"
              icon={MediumIcon}
            />
          </div>
        </PageIntro>
      </Container>
      <PictureGallery pictures={PICTURES} />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16 lg:-mr-10">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="xl:pl-18 space-y-4 lg:pl-16 lg:-mr-10" >
            <ResumeCard title="Work" resume={WORK_EXPERIENCE} />
            <ResumeCard title="Education" resume={EDUCATION_EXPERIENCE} />
          </div>
        </div>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const notionDatabaseId = process.env.NOTION_DATABASE;
  const notionSecret = process.env.NOTION_API_KEY;

  if (!notionDatabaseId || !notionSecret) {
    return {
      notFound: true,
    };
  }

  const notion = new Client({
    auth: notionSecret,
  });

  const query = await notion.databases.query({
    database_id: notionDatabaseId,
    // sort by the most recently created posts
    sorts: [{ property: 'created', direction: 'descending' }],
    filter: { property: 'public', checkbox: { equals: true } },
  });

  return {
    props: {
      articlesProp: query?.results ?? [],
    },
    revalidate: 1,
  };
}

export default HomePage;

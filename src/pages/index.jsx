import { Container } from "@/components/container/Container";
import SocialLink from "@/components/social-link/SocialLink";
import {
  GitHubIcon,
  InstagramIcon,
  LeetCodeIcon,
  LinkedInIcon,
  MediumIcon,
  TwitterIcon,
} from "@/components/social-link/Icons";
import PageIntro from "@/components/page-intro/PageIntro";
import ResumeCard from "@/components/cards/ResumeCard";
import PictureGallery from "@/components/picture-gallery/PictureGallery";
import { ArticleCard } from "@/components/cards/ArticleCard";
import Seo from "@/components/seo/Seo";
import { getPublishedPosts } from "@/util/notion";
import { WORK_EXPERIENCE_DETAILS } from "@/constants/work-experience-details";
import { EDUCATION_DETAILS } from "@/constants/education-details";
import { GALLERY_PICTURES } from "@/constants/pictures-gallery-details";
import { transformNotionArticleToPost } from "@/util/notion-rendering-helper";
import Link from "next/link";
import AppCard from "@/components/cards/AppCard";
import SectionHeading from "@/components/section-heading/SectionHeading";
import { getProjectSections } from "@/util/projects";
import * as ROUTES from "../constants/routes";

const WORK_EXPERIENCE = WORK_EXPERIENCE_DETAILS;
const EDUCATION_EXPERIENCE = EDUCATION_DETAILS;
const PICTURES = GALLERY_PICTURES;

const sectionLink =
  "rounded text-sm font-medium text-zinc-600 transition hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500";

const HomePage = ({ articles, building }) => {
  return (
    <>
      <Seo />
      <Container className="mt-8">
        <PageIntro
          title={
            <>
              Software Developer, Dancer, and{" "}
              <span className="bg-[linear-gradient(transparent_62%,rgba(20,184,166,0.18)_62%)] [box-decoration-break:clone]">
                Lifelong Learner.
              </span>
            </>
          }
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
      {building.length > 0 && (
        <Container className="mt-20 md:mt-24">
          <section aria-labelledby="building-heading">
            <SectionHeading
              id="building-heading"
              action={
                <Link href={ROUTES.PROJECTS} className={sectionLink}>
                  All projects →
                </Link>
              }
            >
              What I&apos;m building
            </SectionHeading>
            {building.length === 1 ? (
              <div className="mt-6">
                <AppCard project={building[0]} />
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {building.map((project) => (
                  <AppCard key={project.name} project={project} compact />
                ))}
              </div>
            )}
          </section>
        </Container>
      )}
      <Container className="mt-20 md:mt-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2 lg:gap-x-16">
          <section aria-labelledby="writing-heading" className="flex flex-col">
            <SectionHeading
              id="writing-heading"
              action={
                <Link href={ROUTES.BLOGS} className={sectionLink}>
                  All posts →
                </Link>
              }
            >
              Recent writing
            </SectionHeading>
            <div className="mt-10 flex flex-col gap-14">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
          <div className="space-y-4 lg:-mr-10">
            <ResumeCard title="Work" resume={WORK_EXPERIENCE} />
            <ResumeCard title="Education" resume={EDUCATION_EXPERIENCE} />
          </div>
        </div>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const databaseId = process.env.NOTION_DATABASE;
  if (!databaseId || !process.env.NOTION_API_KEY) {
    return { notFound: true };
  }

  const posts = await getPublishedPosts(databaseId);
  const articles = posts
    .map(transformNotionArticleToPost)
    .sort((a, b) => b.posted_date.localeCompare(a.posted_date))
    .slice(0, 3);

  return {
    props: { articles, building: getProjectSections().building },
    revalidate: 300,
  };
}

export default HomePage;

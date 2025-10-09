import { useEffect, useState } from "react";
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
import { Client } from "@notionhq/client";
import { WORK_EXPERIENCE_DETAILS } from "@/constants/work-experience-details";
import { EDUCATION_DETAILS } from "@/constants/education-details";
import { GALLERY_PICTURES } from "@/constants/pictures-gallery-details";
import { transformNotionArticleToPost } from "@/util/notion-rendering-helper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as ROUTES from "../constants/routes";

const WORK_EXPERIENCE = WORK_EXPERIENCE_DETAILS;
const EDUCATION_EXPERIENCE = EDUCATION_DETAILS;
const PICTURES = GALLERY_PICTURES;

const HomePage = ({ articlesProp }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    document.title =
      "WithZell - Software Developer, Dance Enthusiast, and Lifelong Learner";

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
          <div className="flex flex-col lg:-mr-10">
            <div className="flex items-start justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recent Writing
              </h2>
              <Link
                href="/blogs"
                className="flex items-center gap-2 font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                View all posts
                <ArrowRight size={20} />
              </Link>
            </div>

            <div className="flex flex-col gap-16">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {articles.length > 3 && (
              <div className="flex justify-center mt-8">
                <Link
                  href="/blogs"
                  className="rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
                >
                  View All Posts
                </Link>
              </div>
            )}
          </div>
          <div className="xl:pl-18 space-y-4 lg:-mr-10 lg:pl-16">
            <ResumeCard title="Work" resume={WORK_EXPERIENCE} />
            <ResumeCard title="Education" resume={EDUCATION_EXPERIENCE} />
          </div>
        </div>
        <section className="border-t border-gray-200 mt-16 pt-16">
          
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href={ROUTES.PRODUCTS}
              className="rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Products
              </h3>
              <p className="text-gray-600">
               Software I'm building to solve problems I care about. From idea to production.
              </p>
            </Link>
            <Link
              href={ROUTES.PROJECTS}
              className="rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-sm"
            >
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Projects
              </h3>
              <p className="text-gray-600">
                Side projects and technical experiments where I explore new ideas and technologies.
              </p>
            </Link>
          </div>
        </section>
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
    sorts: [{ property: "created", direction: "descending" }],
    filter: { property: "public", checkbox: { equals: true } },
  });

  return {
    props: {
      articlesProp: query?.results ?? [],
    },
    revalidate: 1,
  };
}

export default HomePage;

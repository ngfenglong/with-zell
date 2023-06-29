import Link from 'next/link';
import { OuterContainer, InnerContainer } from '../container/Container';
import * as ROUTES from '../../constants/routes';

const Footer = () => {
  return (
    <footer className="mt-32">
      <OuterContainer>
        <div className="border-t border-zinc-100 pb-16 pt-10">
          <InnerContainer>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800">
                <Link href={ROUTES.HOME}>Home</Link>
                <Link href={ROUTES.ABOUT}>About</Link>
                <Link href={ROUTES.PROJECTS}>Projects</Link>
                <Link href={ROUTES.BLOG}>Blog</Link>
                <Link href={ROUTES.RESOURCES}>Resources</Link>
              </div>
              <p className="text-sm text-zinc-400">
                &copy; {new Date().getFullYear()} With Zell. All rights
                reserved.
              </p>
            </div>
          </InnerContainer>
        </div>
      </OuterContainer>
    </footer>
  );
};

export default Footer;

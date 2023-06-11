import { Link } from 'react-router-dom';
import { OuterContainer, InnerContainer } from '../container/Container';
import * as ROUTES from './../../constants/routes';

const Footer = () => {
  return (
    <footer className="mt-32">
      <OuterContainer>
        <div className="border-t border-zinc-100 pb-16 pt-10">
          <InnerContainer>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800">
                <Link to={ROUTES.ABOUT}>About</Link>
                <Link to={ROUTES.PROJECTS}>Projects</Link>
                <Link to={ROUTES.BLOG}>Blog</Link>
                <Link to={ROUTES.RESOURCES}>Resources</Link>
                <Link to={ROUTES.CONTACT}>Contact</Link>
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

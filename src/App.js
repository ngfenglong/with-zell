import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';

import HomePage from './pages/home';
import Layout from './components/layout/Layout';
import ProjectsPage from './pages/projects/Projects';
import AboutPage from './pages/aboutus/About';
import BlogPage from './pages/blog/Blog';
import ResourcesPage from './pages/resources/Resources';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
          <Route path={ROUTES.BLOG} element={<BlogPage />} />
          <Route path={ROUTES.RESOURCES} element={<ResourcesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

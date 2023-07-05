import Link from 'next/link';
import Container from '../../components/container/Container';

const ResourcesPage = () => {
  return (
    <>
      <Container className="pb-12 pt-16">
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
          <div className="py-16">
            <div className="text-center">
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Oops
              </h1>
              <p className="mt-2 text-base text-gray-500">
                This resource page is currently a work in progress.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-base font-medium text-teal-600 hover:text-teal-500"
                >
                  Go back home
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </>
  );
};

export default ResourcesPage;

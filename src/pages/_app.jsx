import { GeistSans } from 'geist/font/sans';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import PageGlow from '@/components/layout/PageGlow';
import '@/styles/global.css';

function App({ Component, pageProps }) {
  return (
    <div className={`${GeistSans.variable} font-sans`}>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100" />
        </div>
      </div>
      <div className="relative isolate">
        <PageGlow />
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

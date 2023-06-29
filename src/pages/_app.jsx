import Header from '@/components/header/Header';
import '@/styles/global.css';
import Footer from '@/components/footer/Footer';

function App({ Component, pageProps }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 " />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          <Component {...pageProps}></Component>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

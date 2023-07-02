const PageIntro = ({ title, intro, children }) => {
  return (
    <>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-4 text-base text-zinc-600">{intro}</p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </>
  );
};

export default PageIntro;

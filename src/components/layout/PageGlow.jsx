/**
 * Soft teal light behind the top of every page, with a faint dot grid that
 * dissolves at the edges. Purely decorative: no hard colour edges.
 */
const PageGlow = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center sm:px-8"
  >
    <div className="relative h-[46rem] w-full max-w-7xl lg:mx-8">
      <div className="absolute inset-0 bg-[radial-gradient(40%_35%_at_82%_8%,rgba(251,191,36,0.05),transparent_70%),radial-gradient(60%_50%_at_50%_0%,rgba(20,184,166,0.10),rgba(20,184,166,0.04)_45%,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(24,24,27,0.07)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_80%)]" />
    </div>
  </div>
);

export default PageGlow;

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const ROTATIONS = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];

/**
 * Tilted photo row. Hovering (or focusing) a photo straightens and lifts it,
 * and its neighbours ease apart. All photos fit on desktop; on small screens
 * the row scrolls sideways.
 */
const PictureGallery = ({ pictures }) => {
  const [active, setActive] = useState(null);

  return (
    <section aria-label="Photos" className="mt-14 sm:mt-16">
      <div className="mx-auto max-w-6xl lg:px-8">
        <ul
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 py-8 [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          onMouseLeave={() => setActive(null)}
        >
          {pictures.map((picture, index) => {
            const isActive = active === index;
            const shift = active === null || isActive ? '' : index < active ? 'lg:-translate-x-3' : 'lg:translate-x-3';
            return (
              <li
                key={picture.src}
                tabIndex={0}
                aria-label={picture.alt}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className={clsx(
                  'relative aspect-[9/10] w-48 flex-none snap-center overflow-hidden rounded-2xl border-4 border-white bg-zinc-100 outline-none sm:w-60 lg:w-auto',
                  'shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_4px_rgba(24,24,27,0.06),0_16px_32px_-16px_rgba(24,24,27,0.25)]',
                  'transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                  'focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
                  isActive
                    ? 'z-10 rotate-0 motion-safe:-translate-y-2.5 motion-safe:scale-[1.04] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_4px_rgba(24,24,27,0.06),0_24px_40px_-16px_rgba(24,24,27,0.30)]'
                    : ROTATIONS[index % ROTATIONS.length],
                  shift
                )}
              >
                <Image
                  src={picture.src}
                  alt={picture.alt}
                  fill
                  sizes="(min-width: 1024px) 14rem, (min-width: 640px) 15rem, 12rem"
                  className="object-cover"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PictureGallery;

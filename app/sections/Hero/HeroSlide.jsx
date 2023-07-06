import {useInView} from 'react-intersection-observer';

import {HeroContent} from './HeroContent';
import {HeroVideo} from './HeroVideo';
import {Image} from '@shopify/hydrogen';

export function HeroSlide({aboveTheFold, isActiveSlide, isFirstSlide, slide}) {
  const {image, video} = slide;
  const {ref, inView} = useInView({
    rootMargin: '0px',
    triggerOnce: true,
  });
  const isVisible =
    (aboveTheFold && isActiveSlide) ||
    (!aboveTheFold && isActiveSlide && inView);

  return (
    <div className="relative h-full w-full" ref={ref}>
      <div className="relative h-full w-full overflow-hidden md:hidden">
        {video?.srcMobile && (
          <HeroVideo
            isVisible={isVisible}
            posterSrc={video.posterMobile?.src}
            videoSrc={video.srcMobile}
          />
        )}

        {image?.imageMobile?.src && !video?.srcMobile && (
          <Image
            alt={image.alt}
            className={`${image.positionMobile}`}
            sizes="100vw"
            src={image.imageMobile.src}
          />
        )}
      </div>

      <div className="relative hidden h-full w-full overflow-hidden md:block">
        {video?.srcDesktop && (
          <HeroVideo
            isVisible={isVisible}
            posterSrc={video.posterDesktop?.src}
            videoSrc={video.srcDesktop}
          />
        )}

        {image?.imageDesktop?.src && !video?.srcDesktop && (
          <Image
            alt={image.alt}
            className={`${image.positionDesktop}`}
            sizes="100vw"
            src={image.imageDesktop.src}
          />
        )}
      </div>

      <HeroContent
        aboveTheFold={aboveTheFold}
        isFirstSlide={isFirstSlide}
        slide={slide}
      />
    </div>
  );
}

HeroSlide.displayName = 'HeroSlide';

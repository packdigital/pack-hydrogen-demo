import {HeroSlide} from './HeroSlide';
import {HeroSlider} from './HeroSlider';
import {Schema} from './Hero.schema';

export function Hero({cms}) {
  const {section, slider, slides} = cms;
  const maxWidthContainerClass = section?.fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';
  const isFullBleed = section?.fullBleed;
  const heightContainerClasses = `${section?.heightMobile} ${section?.heightTablet} ${section?.heightDesktop}`;

  return (
    <div className={`${isFullBleed ? '' : 'px-contained'}`}>
      <div
        className={`relative mx-auto flex flex-col bg-offWhite ${heightContainerClasses} ${maxWidthContainerClass}`}
      >
        {slides?.length > 1 && (
          <HeroSlider
            aboveTheFold={section?.aboveTheFold}
            slider={slider}
            slides={slides}
          />
        )}

        {slides?.length === 1 && (
          <HeroSlide
            aboveTheFold={section?.aboveTheFold}
            isActiveSlide
            isFirstSlide
            slide={slides[0]}
          />
        )}
      </div>
    </div>
  );
}

Hero.displayName = 'Hero';
Hero.Schema = Schema;

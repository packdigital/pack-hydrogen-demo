import {HalfHeroContent} from './HalfHeroContent';
import {HalfHeroMedia} from './HalfHeroMedia';
import {Schema} from './HalfHero.schema';

export function HalfHero({cms}) {
  const {section, content, media} = cms;
  const {
    aspectDesktop,
    aspectMobile,
    aspectTablet,
    fill,
    mediaOrderDesktop,
    mediaOrderMobile,
  } = {
    ...media,
  };

  const maxWidthContainerClass = section?.fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';
  const fillClass = fill
    ? 'h-full'
    : `md:before:float-left ${aspectTablet} ${aspectDesktop}`;
  const mediaOrderClasses = `${
    mediaOrderMobile === '2' ? 'order-2' : 'order-1'
  } ${mediaOrderDesktop === '2' ? 'md:order-2' : 'md:order-1'}`;
  const contentOrderClasses = `${
    mediaOrderMobile === '2' ? 'order-1' : 'order-2'
  } ${mediaOrderDesktop === '2' ? 'md:order-1' : 'md:order-2'}`;
  const mediaBgColorClass =
    section?.bgColor === 'var(--background)' ||
    section?.bgColor === 'var(--white)'
      ? 'bg-offWhite'
      : '';

  return (
    <div
      className={`${section?.fullBleed ? '' : 'px-contained'} ${
        section?.verticalPadding ? 'py-contained' : ''
      }`}
      style={{backgroundColor: section?.bgColor}}
    >
      <div
        className={`relative mx-auto grid grid-cols-1 items-center md:grid-cols-2 ${maxWidthContainerClass}`}
      >
        <div
          className={`relative w-full max-md:before:float-left ${aspectMobile} ${fillClass} ${mediaOrderClasses} ${mediaBgColorClass}`}
        >
          <HalfHeroMedia
            aboveTheFold={section?.aboveTheFold}
            media={media}
            videoAlt={content?.heading}
          />
        </div>

        <div
          className={`flex w-full items-center md:before:float-left ${aspectTablet} ${aspectDesktop} ${contentOrderClasses}`}
        >
          <HalfHeroContent
            aboveTheFold={section?.aboveTheFold}
            content={content}
          />
        </div>
      </div>
    </div>
  );
}

HalfHero.displayName = 'HalfHero';
HalfHero.Schema = Schema;

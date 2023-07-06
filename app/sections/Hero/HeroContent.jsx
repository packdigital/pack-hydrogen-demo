import {useMemo} from 'react';
import {Link} from '@remix-run/react';

export function HeroContent({aboveTheFold, isFirstSlide, slide}) {
  const {button, content, text} = slide;
  const {color, heading, subheading, superheading} = {...text};
  const {
    alignmentMobile,
    alignmentDesktop,
    darkOverlay,
    maxWidthMobile,
    maxWidthDesktop,
    positionMobile,
    positionDesktop,
  } = {
    ...content,
  };
  const alignmentClasses = `${alignmentMobile} ${alignmentDesktop}`;
  const positionClasses = `${positionMobile} ${positionDesktop}`;
  const maxWidthContentClasses = `${maxWidthMobile} ${maxWidthDesktop}`;
  const darkOverlayClass = darkOverlay ? 'bg-[rgba(0,0,0,0.2)]' : '';

  const headingWithBreaks = useMemo(() => {
    const splitHeading = heading?.split('\n');
    if (splitHeading?.length === 1) return heading;
    return splitHeading?.reduce((acc, line, index, arr) => {
      acc.push(<span key={index}>{line}</span>);
      if (index < arr.length - 1) acc.push(<br key={`br${index}`} />);
      return acc;
    }, []);
  }, [heading]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex h-full w-full p-4 md:p-8 xl:p-12 ${positionClasses} ${darkOverlayClass}`}
    >
      <div
        className={`pointer-events-auto flex flex-col ${alignmentClasses} ${maxWidthContentClasses}`}
        style={{color}}
      >
        {superheading && (
          <p className="text-superheading max-lg:mb-1">{superheading}</p>
        )}

        {aboveTheFold && isFirstSlide ? (
          <h1 className="text-title-h1">{headingWithBreaks}</h1>
        ) : (
          <h2 className="text-title-h1">{headingWithBreaks}</h2>
        )}

        {subheading && <p className="mt-4">{subheading}</p>}

        {button?.buttons?.length > 0 && (
          <ul className="mt-6 flex flex-col justify-center gap-4 xs:flex-row">
            {button?.buttons?.slice(0, 2).map(({link, style}, index) => {
              return (
                <li key={index}>
                  <Link
                    className={style}
                    href={button.clickableSlide ? null : link?.url}
                  >
                    {link?.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {button?.clickableSlide && (
        <Link
          aria-label={button.buttons?.[0]?.link?.text}
          className="pointer-events-auto absolute inset-0 z-[1] h-full w-full"
          href={button.buttons?.[0]?.link?.url}
        />
      )}
    </div>
  );
}

HeroContent.displayName = 'HeroContent';

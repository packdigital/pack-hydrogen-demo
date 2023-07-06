import {HalfHeroVideo} from './HalfHeroVideo';
import {Image} from '@shopify/hydrogen';

export function HalfHeroMedia({aboveTheFold, media, videoAlt}) {
  const {image, video} = {...media};
  return (
    <div className="absolute inset-0 h-full w-full">
      <div className="relative h-full w-full overflow-hidden md:hidden">
        {video?.srcMobile && (
          <HalfHeroVideo
            autoplay={video.autoplay}
            posterSrc={video.posterMobile?.src}
            sound={video.sound}
            videoAlt={videoAlt}
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
          <HalfHeroVideo
            autoplay={video.autoplay}
            posterSrc={video.posterDesktop?.src}
            sound={video.sound}
            videoAlt={videoAlt}
            videoSrc={video.srcDesktop}
          />
        )}

        {image?.imageDesktop?.src && !video?.srcDesktop && (
          <Image
            alt={image.alt}
            className={`${image.positionDesktop}`}
            sizes="50vw"
            src={image.imageDesktop.src}
          />
        )}
      </div>
    </div>
  );
}

HalfHeroMedia.displayName = 'HalfHeroMedia';

import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {Schema} from './SocialImagesGrid.schema';

export function SocialImagesGrid({cms}) {
  const {images, section} = cms;
  const maxWidthClass = section?.fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  return (
    <div className={`py-px ${section?.fullBleed ? '' : 'px-contained'}`}>
      <ul
        className={`mx-auto grid grid-cols-2 gap-px sm:grid-cols-4 ${maxWidthClass}`}
      >
        {images?.slice(0, 4).map((item, index) => {
          return (
            <li key={index}>
              <Link
                aria-label={`Open new tab to view ${item.platform} post`}
                href={item.url}
              >
                <div className="relative aspect-square bg-offWhite">
                  {item.image?.src && (
                    <Image
                      alt={item.alt}
                      sizes="(min-width: 768px) 25vw, 50vw"
                      src={item.image.src}
                    />
                  )}

                  <svg
                    className="absolute top-2 right-2 w-4 text-white lg:top-3 lg:right-3 lg:w-5"
                    src={`/svgs/noprecache/social/${item.platform}.svg#${item.platform}`}
                    title={item.platform}
                    viewBox="0 0 24 24"
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

SocialImagesGrid.displayName = 'SocialImagesGrid';
SocialImagesGrid.Schema = Schema;

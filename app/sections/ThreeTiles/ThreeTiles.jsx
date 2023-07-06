import {useState} from 'react';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Spinner} from '~/components/Spinner';
import {Schema} from './ThreeTiles.schema';

export function ThreeTilesTile({aspectRatio, item, textColor}) {
  return (
    <div className="w-full" style={{color: textColor}}>
      <div className={`relative mb-4 bg-offWhite ${aspectRatio}`}>
        <Link aria-label={item.heading} href={item.link?.url} tabIndex="-1">
          {item.image?.src && (
            <Image
              alt={item.alt}
              className={`${item.position}`}
              sizes="(min-width: 1440px) 1200px, (min-width: 768px) 50vw, 100vw"
              src={item.image.src}
            />
          )}
        </Link>
      </div>

      <div className="inset-0 flex h-full w-full flex-col items-start gap-4">
        <Link aria-label={item.heading} href={item.link?.url}>
          <div className="group flex">
            <h2 className="text-xl lg:text-2xl">{item.heading}</h2>

            <span className="ml-[0.75rem] block w-[1.25rem] transition-transform lg:group-hover:translate-x-2">
              <svg
                src="/svgs/arrow-right.svg#arrow-right"
                title="Arrow"
                viewBox="0 0 24 24"
              />
            </span>
          </div>
        </Link>

        {item.description && <p>{item.description}</p>}

        {item.link?.text && (
          <div>
            <Link
              aria-label={item.link.text}
              className="text-label text-main-underline"
              href={item.link.url}
              tabIndex="-1"
            >
              {item.link.text}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ThreeTilesRow({aspectRatio, maxWidthClass, textColor, tiles}) {
  const [swiper, setSwiper] = useState(null);

  return tiles?.length > 0 ? (
    <div className={`mx-auto ${maxWidthClass}`}>
      {/* mobile/tablet */}
      <div className={`relative lg:hidden ${!swiper ? 'min-h-[25rem]' : ''}`}>
        <Swiper
          grabCursor
          onSwiper={setSwiper}
          slidesOffsetAfter={16}
          slidesOffsetBefore={16}
          slidesPerView={1.4}
          spaceBetween={16}
          breakpoints={{
            768: {
              slidesPerView: 2.4,
              slidesOffsetBefore: 32,
              slidesOffsetAfter: 32,
              spaceBetween: 20,
            },
          }}
        >
          {swiper &&
            tiles.slice(0, 3).map((item, index) => {
              return (
                <SwiperSlide className="w-full" key={index}>
                  <ThreeTilesTile
                    aspectRatio={aspectRatio}
                    item={item}
                    textColor={textColor}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>

        {!swiper && (
          <Spinner
            width="32"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>

      {/* desktop */}
      <div className="hidden grid-cols-3 gap-x-5 lg:grid">
        {tiles.slice(0, 3).map((item, blockIndex) => {
          return (
            <div key={blockIndex}>
              <ThreeTilesTile
                aspectRatio={aspectRatio}
                item={item}
                textColor={textColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
}

export function ThreeTiles({cms}) {
  const {button, heading, section, tiles} = cms;
  const {aspectRatio, bgColor, fullWidth, textColor} = {...section};

  const maxWidthClass = fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  return (
    <div
      className="lg:px-contained py-contained"
      style={{backgroundColor: bgColor}}
    >
      {heading && (
        <h2
          className="text-title-h2 mb-6 px-4 text-center md:mb-10"
          style={{color: textColor}}
        >
          {heading}
        </h2>
      )}

      <ThreeTilesRow
        aspectRatio={aspectRatio}
        maxWidthClass={maxWidthClass}
        textColor={textColor}
        tiles={tiles}
      />

      {button?.text && (
        <div className="mt-10 flex flex-col items-center">
          <Link
            aria-label={button.text}
            className={`${section?.buttonStyle || 'btn-primary'}`}
            href={button.url}
          >
            {button.text}
          </Link>
        </div>
      )}
    </div>
  );
}

ThreeTiles.displayName = 'ThreeTiles';
ThreeTiles.Schema = Schema;

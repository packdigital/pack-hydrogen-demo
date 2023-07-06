import {Link} from '@remix-run/react';
import {Markdown} from '~/components/Markdown';
import {Schema} from './TextBlock.schema';

export function TextBlock({cms}) {
  const {buttons, heading, section, subtext} = cms;
  const maxWidthClass = section?.fullWidth
    ? 'max-w-none'
    : 'max-w-[var(--content-max-width)]';

  return (
    <div
      className="px-contained py-contained"
      style={{backgroundColor: section?.bgColor, color: section?.textColor}}
    >
      <div
        className={`mx-auto flex flex-col items-center gap-4 md:gap-6 ${maxWidthClass} text-center`}
      >
        {heading &&
          (section?.aboveTheFold ? (
            <h1 className="text-title-h2 mx-auto max-w-[46rem]">{heading}</h1>
          ) : (
            <h2 className="text-title-h2 mx-auto max-w-[46rem]">{heading}</h2>
          ))}

        {subtext && (
          <div className="mx-auto max-w-[46rem] [&_p]:text-base [&_h2]:text-base [&_h1]:text-base [&_h3]:text-base [&_h4]:text-base [&_h5]:text-base [&_h6]:text-base [&_a]:underline">
            <Markdown>{subtext}</Markdown>
          </div>
        )}

        {buttons?.length > 0 && (
          <ul className="mt-4 flex flex-col justify-center gap-4 xs:flex-row">
            {buttons.slice(0, 2).map(({link, style}, index) => {
              return (
                <li key={index}>
                  <Link
                    aria-label={link?.text}
                    className={style}
                    href={link?.url}
                  >
                    {link?.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

TextBlock.displayName = 'TextBlock';
TextBlock.Schema = Schema;

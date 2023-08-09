import {Link as RemixLink} from '@remix-run/react';
import {PackDemoMessage} from './PackDemoMessage';

export const Footer = ({settings}: {settings: Record<string, any>}) => {
  return (
    <footer className="mt-14 border-t border-t-gray-200">
      <div className="container pt-6 pb-4 flex flex-col gap-10">
        <ul className="flex flex-col gap-4 text-xs font-light">
          <li className="font-bold uppercase">{settings?.menu?.title}</li>
          {settings?.menu?.links?.map(
            ({link}: {link: Record<string, any>}, index: number) => {
              return (
                <li key={index}>
                  <RemixLink to={link?.url}>{link?.text}</RemixLink>
                </li>
              );
            },
          )}
        </ul>

        <div className="flex justify-between gap-6">
          <a className="col-span-1 justify-self-center" href="/">
            {/* Pack SVG Logo */}
            <img src="/logo.svg" alt="Pack logo" className="w-6" />
          </a>

          <ul className="flex gap-4 text-xs font-light">
            {settings?.legal?.links?.map(
              ({link}: {link: Record<string, any>}, index: number) => {
                return (
                  <li key={index}>
                    <RemixLink to={link?.url}>{link?.text}</RemixLink>
                  </li>
                );
              },
            )}
            <li>© Pack, {new Date().getFullYear()}</li>
          </ul>
        </div>

        <PackDemoMessage />
      </div>
    </footer>
  );
};

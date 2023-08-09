import {Link as RemixLink} from '@remix-run/react';

export const Header = ({settings}: {settings: Record<string, any>}) => {
  return (
    <header>
      <div className="w-full py-4 border-b border-b-gray-200">
        <div className="container grid grid-cols-3 items-center">
          <nav className="col-span-1 justify-self-start">
            <div className="hidden lg:block">
              <NavList links={settings?.links} />
            </div>
          </nav>

          <a className="col-span-1 justify-self-center" href="/">
            {/* Pack SVG Logo */}
            <img src="/logo.svg" alt="Pack logo" />
          </a>

          <a href="/cart" className="col-span-1 justify-self-end">
            {/* Cart SVG Icon */}
            <img src="/cart-icon.svg" alt="Shopping bag icon" />
          </a>
        </div>
      </div>

      {/* Mobile nav list */}
      <div className="flex justify-center lg:hidden py-3 border-b border-b-gray-200 w-full">
        <NavList links={settings?.links} />
      </div>
    </header>
  );
};

const NavList = ({links}: {links: Array<Record<string, any>>}) => {
  return (
    <ul className="flex items-center gap-6 uppercase text-xs font-bold">
      {links?.map(({link}, index) => {
        return (
          <li className="hover:underline" key={index}>
            <RemixLink to={link?.url}>{link?.text}</RemixLink>
          </li>
        );
      })}
    </ul>
  );
};

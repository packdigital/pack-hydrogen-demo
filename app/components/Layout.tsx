import {ReactNode} from 'react';
import {PackDemoMessage} from './PackDemoMessage';

export function Layout({children}: {children: ReactNode}) {
  return (
    <>
      <header>
        <div className="w-full py-4 border-b border-b-gray-200">
          <div className="container grid grid-cols-3 items-center">
            <nav className="col-span-1 justify-self-start">
              <div className="hidden lg:block">
                <NavList />
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
          <NavList />
        </div>
      </header>

      <main
        role="main"
        id="mainContent"
        className="container flex-grow p-4 lg:px-6"
      >
        {children}
      </main>

      <footer className="mt-14 border-t border-t-gray-200">
        <div className="container pt-6 pb-4 flex flex-col gap-10">
          <ul className="flex flex-col gap-4 text-xs font-light">
            <li className="font-bold uppercase">Shop all</li>
            <li>Shop all</li>
            <li>Story</li>
            <li>About this demo</li>
            <li>Sections playground</li>
          </ul>

          <div className="flex justify-between gap-6">
            <a className="col-span-1 justify-self-center" href="/">
              {/* Pack SVG Logo */}
              <img src="/logo.svg" alt="Pack logo" className="w-6" />
            </a>

            <ul className="flex gap-4 text-xs font-light">
              <li>Privacy policy</li>
              <li>Terms & Conditions</li>
              <li>© Pack, {new Date().getFullYear()}</li>
            </ul>
          </div>

          <PackDemoMessage />
        </div>
      </footer>
    </>
  );
}

const NavList = () => {
  return (
    <ul className="flex items-center gap-6 uppercase text-xs font-bold">
      <li className="hover:underline">
        <a href="/">Shop all</a>
      </li>
      <li className="hover:underline">
        <a href="/">Story</a>
      </li>
      <li className="hover:underline">
        <a href="/">About this demo</a>
      </li>
    </ul>
  );
};

import {ReactNode} from 'react';

export function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
      <header
        role="banner"
        className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm`}
      >
        <div className="flex gap-12">
          <a className="font-bold" href="/">
            {title}
          </a>
        </div>
      </header>

      <main
        role="main"
        id="mainContent"
        className="flex-grow p-6 md:p-8 lg:p-12"
      >
        {children}
      </main>
    </div>
  );
}

import {ReactNode} from 'react';
import {Header} from './Header';
import {Footer} from './Footer';

export function Layout({
  siteSettings,
  children,
}: {
  siteSettings?: Record<string, any>;
  children: ReactNode;
}) {
  return (
    <>
      <Header settings={siteSettings?.settings?.header} />

      <main role="main" id="mainContent" className="flex-grow py-4">
        {children}
      </main>

      <Footer settings={siteSettings?.settings?.footer} />
    </>
  );
}

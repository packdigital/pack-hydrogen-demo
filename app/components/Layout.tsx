import {ReactNode} from 'react';
import {Header} from './Header';
import {Footer} from './Footer';
import {useSiteSettings} from '@pack/react';

export function Layout({
  children,
}: {
  siteSettings?: Record<string, any>;
  children: ReactNode;
}) {
  const siteSettings = useSiteSettings();
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

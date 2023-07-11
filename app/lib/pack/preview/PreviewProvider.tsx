import {PreviewContext} from '~/lib/pack/preview/PreviewContent';

interface PreviewContentProps {
  children: React.ReactNode;
  preview?: boolean;
}

export function PreviewProvider({preview, children}: PreviewContentProps) {
  return (
    <PreviewContext.Provider value={!!preview}>
      {children}
    </PreviewContext.Provider>
  );
}

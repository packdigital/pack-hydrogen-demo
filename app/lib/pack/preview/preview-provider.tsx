import {ReactNode, useState} from 'react';
import {PreviewContext} from '~/lib/pack/preview/preview-content';

interface PreviewContentProps {
  children: ReactNode;
  siteSettings: any;
  isPreviewModeEnabled?: boolean;
}

export function PreviewProvider({
  children,
  isPreviewModeEnabled,
  siteSettings,
}: PreviewContentProps) {
  const [previewStorefrontSettings, setPreviewStorefrontSettings] =
    useState<any>();

  return (
    <PreviewContext.Provider
      value={{
        isPreview: !!isPreviewModeEnabled,
        previewStorefrontSettings,
        setPreviewStorefrontSettings,
        siteSettings,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

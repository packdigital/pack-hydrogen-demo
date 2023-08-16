import {createContext, useContext} from 'react';

type PreviewContextValue = {
  isPreview: boolean;
  siteSettings: any;
  previewStorefrontSettings?: any;
  setPreviewStorefrontSettings: (siteSettings: any) => void;
};

export const PreviewContext = createContext<PreviewContextValue>({
  isPreview: false,
  setPreviewStorefrontSettings: () => {},
  siteSettings: undefined,
});

export const usePreviewContext = () => useContext(PreviewContext);

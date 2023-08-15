import {usePreviewContext} from './preview/preview-content';

export const useSiteSettings = (): Record<string, any> => {
  const {isPreview, previewStorefrontSettings, siteSettings} =
    usePreviewContext();

  return isPreview
    ? previewStorefrontSettings
    : siteSettings?.data?.siteSettings;
};

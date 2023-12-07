import { previewModeAction, previewModeLoader } from '@pack/hydrogen';
import { ActionFunction, LoaderFunction } from '@shopify/remix-oxygen';

export const action: ActionFunction = previewModeAction;
export const loader: LoaderFunction = previewModeLoader;

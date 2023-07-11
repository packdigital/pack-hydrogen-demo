import {createContext, useContext} from 'react';

export const PreviewContext = createContext<boolean>(false);

export const usePreviewContext = () => useContext(PreviewContext);

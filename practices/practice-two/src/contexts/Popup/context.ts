import { createContext } from 'react';

export type PopupState = {
  dispatch: (_fc: () => void) => void;
};

export const PopupContext = createContext<PopupState | null>(null);

import { ReactNode, MouseEvent, useState, useMemo, useCallback } from 'react';

// Components
import { Popup } from 'components';

// Contexts
import { PopupContext } from 'contexts/Popup/context';

// Constants
import { MESSAGES } from '@constants';

// const initialState = {
//   isShown: false,
//   accepter: () => {},
// };

const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    isShown: boolean;
    accepter: (_event: MouseEvent) => void;
  } | null>(null);

  const props = useMemo(() => {
    return {
      dispatch: (callback: () => void) => {
        setState({
          isShown: true,
          accepter: callback,
        });
      },
    };
  }, []);

  const onAccept = useCallback(
    (event: MouseEvent) => {
      state?.accepter(event);

      setState(null);
    },
    [state]
  );

  return (
    <PopupContext.Provider value={props}>
      {children}

      {state?.isShown && (
        <Popup
          title={MESSAGES.DELETE_TITLE}
          description={MESSAGES.DELETE_DESCRIPTION}
          onCancel={() => setState(null)}
          onAccept={onAccept}
        />
      )}
    </PopupContext.Provider>
  );
};

export default PopupProvider;

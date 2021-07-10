import React from 'react';
import Listener from './Listener';
import messageManager from './MessageManager';

const useRegisterListener = (listener: Listener) => {
  React.useEffect(() => {
    messageManager.registerListener(listener);
    return () => messageManager.removeListener(listener);
  });
};

export default useRegisterListener;

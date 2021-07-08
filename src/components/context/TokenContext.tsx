import React from 'react';

interface TokenContextType {
  token: string | null;
  setToken: (token: string) => void;
}

const TokenContext = React.createContext<TokenContextType>({
  token: null,
  setToken: () => {},
});

export default TokenContext;

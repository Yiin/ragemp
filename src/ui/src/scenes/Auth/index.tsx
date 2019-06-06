import React from 'react';

import AuthContextProvider from './context/Provider';
import Auth from './Auth';

const Bridge: React.FC = () => {
  return (
    <AuthContextProvider>
      <Auth />
    </AuthContextProvider>
  );
};

export default Bridge;

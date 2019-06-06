import React, { useState, useMemo } from 'react';

import AuthContext from './context';

const AuthContextProvider: React.FC = ({ children }) => {
  const activeTab = useState<Tab>('login');
  const loginForm = {
    username: useState(''),
    password: useState(''),
  };

  const value = useMemo(() => ({
    activeTab,
    loginForm,
  }), [activeTab]);

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

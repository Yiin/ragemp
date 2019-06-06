import { createContext } from 'react';

type AuthContextValue = {
  activeTab: [Tab, React.Dispatch<React.SetStateAction<Tab>>];
  loginForm: {
    username: [string, React.Dispatch<React.SetStateAction<string>>];
    password: [string, React.Dispatch<React.SetStateAction<string>>];
  };
};

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export default AuthContext;

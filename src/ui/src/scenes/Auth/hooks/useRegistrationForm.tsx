import React, { useContext, useState } from 'react';
import rpc from 'rage-rpc';

import { SharedConstants } from 'Shared/constants';

import useInput from '../hooks/useInput';
import AuthContext from '../context/context';

const useRegistrationForm = () => {
  const {
    activeTab: [, changeTab],
    loginForm: {
      username: [, setLoginUsername],
      password: [, setLoginPassword],
    },
  } = useContext(AuthContext);
  const [ username, setUsername ] = useInput('');
  const [ password, setPassword ] = useInput('');
  const [ email, setEmail ] = useInput('');
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const [ errors, setErrors ] = useState<RegistrationErrors>({});
  
  const submitForm = async () => {
    setLoading(true);
    try {
      await rpc.callServer(SharedConstants.Auth.RPC.SUBMIT_REGISTRATION_FORM, {
        username,
        email,
        password,
      });
      setLoginUsername(username);
      setLoginPassword(password);
      changeTab('login');
    } catch (errors) {
      setErrors(errors);
    }
    setLoading(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submitForm();
    }
  };
  
  return {
    errors,
    username,
    password,
    email,
    isLoading,
    setUsername,
    setPassword,
    setEmail,
    submitForm,
    handleKeyDown,
  };
}

export default useRegistrationForm;

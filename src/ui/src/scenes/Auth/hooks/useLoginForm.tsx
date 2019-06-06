import React, { useContext, useState } from 'react';
import * as rpc from 'rage-rpc';

import { SharedConstants } from 'Shared/constants';

import useInput from '../hooks/useInput';
import AuthContext from '../context/context';

const useLoginForm = () => {
  const {
    loginForm: {
      username: [loginUsername],
      password: [loginPassword],
    },
  } = useContext(AuthContext);
  const [ username, setUsername ] = useInput(loginUsername);
  const [ password, setPassword ] = useInput(loginPassword);
  const [ remember, setRemember ] = useInput(true);
  const [ isLoading, setLoading ] = useState<boolean>(false);
  const [ errors, setErrors ] = useState<RegistrationErrors>({});
  
  const submitForm = async () => {
    setLoading(true);
    try {
      const response = await rpc.callServer(SharedConstants.Auth.RPC.SUBMIT_LOGIN_FORM, {
        username,
        password,
        remember,
      });
      setErrors({});

      await rpc.callClient(SharedConstants.Auth.RPC.AFTER_PLAYER_LOGIN, response);
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
    remember,
    isLoading,
    setUsername,
    setPassword,
    setRemember,
    submitForm,
    handleKeyDown,
  };
}

export default useLoginForm;

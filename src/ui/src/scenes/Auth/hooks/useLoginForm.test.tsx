import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { nockRPC } from '~/test-utils/nock-rpc';
import useLoginForm from './useLoginForm';
import { SharedConstants } from '~/../../shared/constants';

type UseLoginForm = typeof useLoginForm;

type HookProps<T extends () => any = any> = {
  hook: ReturnType<T>;
};

type HookWrapperProps = {
  hook: (...args: any[]) => any;
  context?: any;
};

const Hook: React.FC<HookProps> = () => null;
const HookWrapper: React.FC<HookWrapperProps> = ({ hook, context }) => (
  <Hook hook={ hook(context) } />
);

function useHook<T extends () => any>(wrapper: ShallowWrapper) {
  return (wrapper.find('Hook').props() as HookProps<T>).hook;
}

describe('Login tab', () => {
  it('should display validation errors if response fails', async () => {
    nockRPC
      .callServer(SharedConstants.Auth.RPC.SUBMIT_LOGIN_FORM)
      .reject({
        username: 'foo',
      });

    const wrapper = shallow(<HookWrapper hook={ useLoginForm } />);
    const { submitForm } = useHook<UseLoginForm>(wrapper);

    await submitForm();
    const { errors } = useHook<UseLoginForm>(wrapper);

    expect(errors).toEqual({
      username: 'foo',
    });
  });

  it('should set default username & password', async () => {
    const wrapper = shallow(
      <HookWrapper
        hook={ useLoginForm }
        context={ {
          loginForm: {
            username: ['foo'],
            password: ['bar'],
          },
        } }
      />
    );

    const { username, password } = useHook<UseLoginForm>(wrapper);

    expect({
      username,
      password,
    }).toEqual({
      username: 'foo',
      password: 'bar',
    });
  })
});

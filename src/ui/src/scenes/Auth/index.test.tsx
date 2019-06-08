import React from 'react';
import { mount, shallow } from 'enzyme';
import AuthScene from './index';
import Login from './tabs/Login';
import Registration from './tabs/Registration';

describe('Auth scene', () => {
  it('renders without crashing', () => {
    shallow(<AuthScene />);
  });

  it('by default should render Login tab', () => {
    expect(
      mount(<AuthScene />)
        .contains(<Login />)
    ).toBeTruthy();
  });

  it('should render Registration tab when selected', () => {
    const component = mount(<AuthScene />);

    component
      .find('.registration-tab').first()
      .simulate('click');
    
    expect(
      component.contains(<Login />)
    ).toBeFalsy();

    expect(
      component.contains(<Registration />)
    ).toBeTruthy();
  })
});

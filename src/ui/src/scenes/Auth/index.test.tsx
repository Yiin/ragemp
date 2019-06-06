import React from 'react';
import ReactDOM from 'react-dom';
import AuthScene from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthScene />, div);
  ReactDOM.unmountComponentAtNode(div);
});

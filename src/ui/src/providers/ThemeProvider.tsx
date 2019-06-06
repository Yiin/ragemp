import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { grey, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    background: {
      default: fade(grey[900], 0.7),
      paper: fade(grey[900], 0.7),
    },
    text: {
      primary: grey[100],
      secondary: grey[300],
    },
    action: {
      active: amber[400],
      selected: fade(grey[600], 0.7),
      hover: fade(grey[600], 0.7), //fade(grey[900], .6),
    },
    primary: amber,
    error: {
      main: grey[900],
    },
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        userSelect: 'none',
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const ThemeProvider = (Target: any): typeof Target =>
  class extends React.PureComponent {
    render() {
      return (
        <MuiThemeProvider theme={ theme }>
          <Target />
        </MuiThemeProvider>
      );
    }
  };

export default ThemeProvider;

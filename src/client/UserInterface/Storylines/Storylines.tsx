import React from 'react';
import { hot } from 'react-hot-loader/root';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from '../_theme';
import Quests from './Quests';

const Storylines = () => (
    <MuiThemeProvider theme={ theme }>
        <Quests />
    </MuiThemeProvider>
);

export default hot(Storylines);

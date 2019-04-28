import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { teal, grey, blueGrey, red, amber } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        background: {
            default: fade(grey[900], .7),
            paper: fade(grey[900], .7),
        },
        text: {
            primary: grey[100],
            secondary: grey[300],
        },
        action: {
            active: amber[400],
            selected: fade(grey[600], .7),
            hover: fade(grey[600], .7), //fade(grey[900], .6),
        },
        primary: teal,
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
});

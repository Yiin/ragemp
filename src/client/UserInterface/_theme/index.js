import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { teal, grey, blueGrey } from '@material-ui/core/colors';

export const theme = createMuiTheme({
    palette: {
        background: {
            paper: blueGrey[50],
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

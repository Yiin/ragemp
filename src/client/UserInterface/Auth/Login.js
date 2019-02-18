import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import LoginIcon from '@material-ui/icons/KeyboardArrowRight';

import { Context } from './context';

const styles = () => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
    },
    description: {
        paddingTop: '15px',
        paddingBottom: '10px',
    },
    button: {
        marginTop: '10px',
    },
    buttonLabel: {
        paddingTop: '1px',
    },
});

const Login = ({ classes }) => {
    const { state, dispatch } = useContext(Context);

    const setUsername = e => dispatch({ type: 'set-username', payload: e.target.value });
    const setPassword = e => dispatch({ type: 'set-password', payload: e.target.value });

    return (
        <div className={ classes.root }>
            <div className={ classes.description }>
                <Typography variant="body2">
                    Login
                </Typography>

                <Typography variant="body1">
                    Please enter your credentials.
                </Typography>
            </div>

            <TextField
                value={ state.username }
                onChange={ setUsername }
                label="Username"
                margin="dense"
                variant="outlined"
            />

            <TextField
                value={ state.password }
                onChange={ setPassword }
                type="password"
                label="Password"
                margin="dense"
                variant="outlined"
            />

            <Button
                variant="contained"
                color="primary"
                classes={ {
                    root: classes.button,
                    label: classes.buttonLabel,
                } }
                size="large"
            >
                Login
                <LoginIcon />
            </Button>
        </div>
    );
};

export default withStyles(styles)(Login);

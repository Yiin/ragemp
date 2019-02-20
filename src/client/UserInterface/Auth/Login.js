import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import LoginIcon from '@material-ui/icons/KeyboardArrowRight';

import { Context } from './context';
import { submitForm } from './api';

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
    const { state } = useContext(Context);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleUsernameChange = e => setUsername(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);

    const handleSubmit = () => submitForm('Login', username, password);

    const validationError = state.error && state.error.form === 'login'
        ? { [state.error.field]: state.error.message }
        : {};

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
                value={ username }
                onChange={ handleUsernameChange }
                label="Username"
                margin="dense"
                variant="outlined"
                error={ validationError.username }
                helperText={ validationError.username }
            />

            <TextField
                value={ password }
                onChange={ handlePasswordChange }
                type="password"
                label="Password"
                margin="dense"
                variant="outlined"
                error={ validationError.password }
                helperText={ validationError.password }
            />

            <Button
                onClick={ handleSubmit }
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

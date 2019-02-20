import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import RegistrationIcon from '@material-ui/icons/KeyboardArrowRight';

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

const Registration = ({ classes }) => {
    const { state, dispatch } = useContext(Context);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleUsernameChange = e => setUsername(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleEmailChange = e => setEmail(e.target.value);

    const handleSubmit = () => submitForm('Registration', username, password, email);

    const validationError = state.error && state.error.form === 'registration'
        ? { [state.error.field]: state.error.message }
        : {};

    return (
        <div className={ classes.root }>
            <div className={ classes.description }>
                <Typography variant="body2">
                    Registration
                </Typography>

                <Typography variant="body1">
                    Create new account if you haven't registered yet.
                </Typography>
            </div>

            <TextField
                value={ username }
                onChange={ handleUsernameChange }
                label="Username"
                margin="dense"
                variant="outlined"
                error={ !!validationError.username }
                helperText={ validationError.username }
            />

            <TextField
                value={ password }
                onChange={ handlePasswordChange }
                type="password"
                label="Password"
                margin="dense"
                variant="outlined"
            />

            <TextField
                value={ email }
                onChange={ handleEmailChange }
                type="email"
                label="Email"
                margin="dense"
                variant="outlined"
            />

            <Button
                onClick={ handleSubmit }
                variant="contained"
                color="primary"
                classes={ {
                    root: classes.button,
                    label: classes.buttonLabel
                } }
                size="large"
            >
                Register
                <RegistrationIcon />
            </Button>
        </div>
    );
}

export default withStyles(styles)(Registration);

import React, { useContext, useState } from 'react';
import * as rpc from 'rage-rpc';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import RegistrationIcon from '@material-ui/icons/KeyboardArrowRight';

import { SharedConstants } from 'Shared/constants';

import { Context } from '..';
import {
    setRegistrationErrors,
    setLoginErrors,
    setLoginUsername,
    setLoginPassword,
    setScene,
} from '../asm';

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
    const [ loading, setLoading ] = useState(false);

    const { errors } = state.registrationForm;

    const handleUsernameChange = e => setUsername(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleEmailChange = e => setEmail(e.target.value);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await rpc.callServer(SharedConstants.Auth.RPC.SUBMIT_REGISTRATION_FORM, {
                username,
                email,
                password,
            });
            dispatch(setRegistrationErrors(null));
            dispatch(setLoginErrors(null));
            dispatch(setLoginUsername(username));
            dispatch(setLoginPassword(password));
            dispatch(setScene('login'));
        } catch (errors) {
            dispatch(setRegistrationErrors(errors));
        }
        setLoading(false);
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

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
                onKeyDown={ handleKeyDown }
                label="Username"
                margin="dense"
                variant="outlined"
                error={ errors.username }
                helperText={ errors.username }
            />

            <TextField
                value={ email }
                onChange={ handleEmailChange }
                onKeyDown={ handleKeyDown }
                type="email"
                label="Email"
                margin="dense"
                variant="outlined"
                error={ errors.email }
                helperText={ errors.email }
            />

            <TextField
                value={ password }
                onChange={ handlePasswordChange }
                onKeyDown={ handleKeyDown }
                type="password"
                label="Password"
                margin="dense"
                variant="outlined"
                error={ errors.password }
                helperText={ errors.password }
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
                disabled={ loading }
            >
                Register
                <RegistrationIcon />
            </Button>
        </div>
    );
}

export default withStyles(styles)(Registration);

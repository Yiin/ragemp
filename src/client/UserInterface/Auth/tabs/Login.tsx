import React, { useContext, useState } from 'react';
import * as rpc from 'rage-rpc';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import LoginIcon from '@material-ui/icons/KeyboardArrowRight';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import { SharedConstants } from 'Shared/constants';
import { AuthConstants } from '~/constants/auth';
import { Context } from '..';
import { setLoginErrors } from '../asm';

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
    const [ username, setUsername ] = useState(state.loginForm.username);
    const [ password, setPassword ] = useState(state.loginForm.password);
    const [ remember, setRemember ] = useState(true);
    const [ loading, setLoading ] = useState(false);

    const { errors } = state.loginForm;

    const handleUsernameChange = e => setUsername(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleRememberChange = e => setRemember(!remember);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await rpc.callServer(
                SharedConstants.Auth.RPC.SUBMIT_LOGIN_FORM, {
                username,
                password,
                remember,
            });
            dispatch(setLoginErrors(null));

            // @ts-ignore mp.trigger method exists in CEF environment
            await mp.trigger(AuthConstants.Events.AFTER_PLAYER_LOGIN);
            await rpc.callClient(AuthConstants.RPC.AFTER_PLAYER_LOGIN, response);
        } catch (errors) {
            dispatch(setLoginErrors(errors));
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
                    Login
                </Typography>

                <Typography variant="body1">
                    Please enter your credentials.
                </Typography>
            </div>

            <TextField
                value={ username }
                onChange={ handleUsernameChange }
                onKeyDown={ handleKeyDown }
                label="Username"
                margin="dense"
                variant="outlined"
                error={ !!errors.username }
                helperText={ errors.username }
            />

            <TextField
                value={ password }
                onChange={ handlePasswordChange }
                onKeyDown={ handleKeyDown }
                type="password"
                label="Password"
                margin="dense"
                variant="outlined"
                error={ !!errors.password }
                helperText={ errors.password }
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={ remember }
                        onChange={ handleRememberChange }
                        color="primary"
                    />
                }
                label="Remember me"
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
                disabled={ loading }
            >
                Login
                <LoginIcon />
            </Button>
        </div>
    );
};

export default withStyles(styles)(Login);

import React, { useContext } from 'react';
import { hot } from 'react-hot-loader/root';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Login from './tabs/Login';
import Registration from './tabs/Registration';

import { Context } from '.';
import { setScene, setLoginErrors, setRegistrationErrors } from './asm';
import { MuiThemeProvider } from '@material-ui/core';

import { theme } from '../_theme';

const styles = theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    window: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: '15%',
    },
});

const Auth = ({ classes }) => {
    const { state, dispatch } = useContext(Context);

    const handleSceneChange = (e, scene) => {
        if (scene !== state.scene) {
            switch (scene) {
                case 'login':
                    dispatch(setLoginErrors(null));
                    break;
                case 'registration':
                    dispatch(setRegistrationErrors(null));
                    break;
            }
            dispatch(setScene(scene));
        }
    };

    return (
        <MuiThemeProvider theme={ theme }>
            <div className={ classes.root }>
                <Paper className={ classes.window }>
                    <Tabs
                        value={ state.scene }
                        onChange={ handleSceneChange }
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab
                            disableRipple
                            label="Login"
                            value="login"
                        />
                        <Tab
                            disableRipple
                            label="Register"
                            value="registration"
                        />
                    </Tabs>
                    { ({
                        login: () => <Login />,
                        registration: () => <Registration />,
                    })[state.scene]() }
                </Paper>
            </div>
        </MuiThemeProvider>
    );
}

export default hot(withStyles(styles)(Auth));

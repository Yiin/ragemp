import React, { useContext } from 'react';
import { hot } from 'react-hot-loader/root';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Login from './Login';
import Registration from './Registration';

import { Context } from './context';

const styles = theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    window: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
});

const Auth = ({ classes }) => {
    const { state, dispatch } = useContext(Context);

    const setScene = (e, scene) => dispatch({ type: 'set-scene', payload: scene });

    return (
        <div className={ classes.root }>
            <Paper className={ classes.window }>
                <Tabs
                    value={ state.scene }
                    onChange={ setScene }
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                >
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="Login"
                        value="login"
                    />
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
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
    );
}

export default hot(withStyles(styles)(Auth));

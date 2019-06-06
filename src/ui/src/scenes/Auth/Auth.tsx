import React, { useContext, useCallback, useMemo } from 'react';
import { Classes } from 'jss';

import withStyles, { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Theme } from '@material-ui/core';

import Login from './tabs/Login';
import Registration from './tabs/Registration';

import AuthContext from './context/context';

const styles: StyleRulesCallback = (theme: Theme) => ({
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

type Props = {
  classes: Classes;
};

const Auth: React.FC<Props> = ({ classes }) => {
  const {
    activeTab: [currentTab, changeTab],
  } = useContext(AuthContext);

  const handleTabChange = useCallback((event: React.ChangeEvent<{}>, tab: Tab) => {
    changeTab(tab);
  }, []);

  const activeTab = useMemo(() => ({
    login: () => <Login />,
    registration: () => <Registration />,
  })[currentTab](), [currentTab]);

  return (
    <div className={ classes.root }>
      <Paper className={ classes.window }>
        <>
          <Tabs
            value={ currentTab }
            onChange={ handleTabChange }
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab disableRipple label="Login" value="login" />
            <Tab disableRipple label="Register" value="registration" />
          </Tabs>
          { activeTab }
        </>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Auth);

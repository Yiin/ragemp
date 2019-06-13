import React, { PureComponent } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Index from './scenes/Index';
import Parents from './scenes/Parents';
import Features from './scenes/Features';
import Appearance from './scenes/Appearance';
import HairAndColors from './scenes/HairAndColors';

const styles = theme => ({
  background: {
    width: '100vw',
    height: '100vh',
  },
  root: {
    width: '364px',
    position: 'absolute',
    top: '10%',
    right: '5%',

    [theme.breakpoints.up('lg')]: {
      left: 'auto',
      right: '20%',
    },
  },
});

class CharacterSelection extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={ classes.background }>
        <Paper classes={ { root: classes.root } }>
          <Router>
            <Switch>
              <Route exact path="/" component={ Index } />
              <Route exact path="/parents" component={ Parents } />
              <Route exact path="/features" component={ Features } />
              <Route exact path="/appearance" component={ Appearance } />
              <Route exact path="/hair-and-colors" component={ HairAndColors } />
            </Switch>
          </Router>
          <Divider />
        </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(CharacterSelection);

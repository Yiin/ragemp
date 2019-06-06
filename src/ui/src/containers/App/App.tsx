import React, { Fragment, PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContextProvider from '~/providers/ContextProvider';
import ThemeProvider from '~/providers/ThemeProvider';
import AuthScene from '~/scenes/Auth';

@ContextProvider
@ThemeProvider
class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/Auth" component={ AuthScene } />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;

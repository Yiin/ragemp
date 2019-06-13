import React, { Fragment, PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContextProvider from '~/providers/ContextProvider';
import ThemeProvider from '~/providers/ThemeProvider';
import Auth from '~/scenes/Auth';
import CharacterCreation from '~/scenes/CharacterCreation';
import CharacterSelection from '~/scenes/CharacterSelection';

@ContextProvider
@ThemeProvider
class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Router>
          <Switch>
            <Route exact path="/Auth" component={ Auth } />
            <Route exact path="/CharacterCreation" component={ CharacterCreation } />
            <Route exact path="/CharacterSelection" component={ CharacterSelection } />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;

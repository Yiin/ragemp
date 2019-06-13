import React from 'react';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SceneOption = ({
  history,
  label,
  to,
}) => (
  <ListItem button onClick={ () => history.push(to) }>
    <ListItemText>
      { label }
    </ListItemText>
  </ListItem>
);

export default withRouter(SceneOption);

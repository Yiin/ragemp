import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const SceneOption = ({
  label,
  onClick,
}) => (
  <ListItem button={ !!onClick } onClick={ onClick }>
    <ListItemText>
      { label }
    </ListItemText>
  </ListItem>
);

export default SceneOption;

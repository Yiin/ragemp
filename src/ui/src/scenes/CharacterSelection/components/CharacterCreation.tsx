import React, { MouseEventHandler } from 'react';
import { Classes } from 'jss';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCharacterIcon from '@material-ui/icons/PersonAdd';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  primary: {
    paddingTop: '1px',
  },
});

type Props = {
  classes: Classes;
  onClick: MouseEventHandler;
};

const CharacterCreation: React.FC<Props> = ({ classes, onClick }) => (
  <ListItem button onClick={ onClick }>
    <ListItemIcon>
      <AddCharacterIcon />
    </ListItemIcon>
    <ListItemText
      classes={ { primary: classes.primary } }
      primary="Create new character"
    />
  </ListItem>
);

export default withStyles(styles)(CharacterCreation);

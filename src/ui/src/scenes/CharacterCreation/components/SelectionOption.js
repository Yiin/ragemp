import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import IconLeft from '@material-ui/icons/KeyboardArrowLeft';
import IconRight from '@material-ui/icons/KeyboardArrowRight';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  fixVerticalAlignment: {
    paddingTop: '1px',
  },
  selection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '170px',
  },
  fullWidthSelection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    right: 'auto',
  },
});

const SelectionOption = ({
  classes,
  label,
  options,
  value,
  onChange,
}) => {
  const [index, setIndex] = useState(options.indexOf(value));

  const indices = options.reduce((arr, val, index) => [
    ...arr,
    ...(val ? [index] : []),
  ], []);

  const handleClickPrev = () => {
    const prevIndex = !index
      ? indices[indices.length - 1]
      : indices[indices.indexOf(index) - 1];

    setIndex(prevIndex);
    onChange(options[prevIndex]);
  };

  const handleClickNext = () => {
    const nextIndex = index === indices[indices.length - 1]
      ? 0
      : indices[indices.indexOf(index) + 1];

    setIndex(nextIndex);
    onChange(options[nextIndex]);
  };

  return (
    <ListItem>
      <ListItemText>
        { label }

        <ListItemSecondaryAction
          classes={ {
            root: label
              ? classes.selection
              : classes.fullWidthSelection
          } }
        >
          <IconButton onClick={ handleClickPrev }>
            <IconLeft />
          </IconButton>
          <Typography variant="body2">
            { value }
          </Typography>
          <IconButton onClick={ handleClickNext }>
            <IconRight />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemText>
    </ListItem>
  );
}

export default withStyles(styles)(SelectionOption);

import React, { useMemo } from 'react';
import { Classes } from 'jss';
import { callClient } from 'rage-rpc';
import { Button, withStyles, createStyles } from '@material-ui/core';
import { SharedConstants } from 'Shared/constants';

const styles = createStyles({
  root: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '16px 64px',
    fontSize: '24px'
  },
});

type Props = {
  classes: Classes;
};

const PlayButton: React.FC<Props> = ({ classes }) => {
  const handleClickPlay = useMemo(() => () => {
    callClient(SharedConstants.CharacterSelection.RPC.START_GAME);
  }, []);

  return (
    <Button
      classes={ { root: classes.root } }
      size="large"
      color="primary"
      variant="contained"
      onClick={ handleClickPlay }
    >
      Play Now!!!
    </Button>
  );
};

export default withStyles(styles)(PlayButton);

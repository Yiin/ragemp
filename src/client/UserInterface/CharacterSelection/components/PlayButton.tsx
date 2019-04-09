import React from 'react';
import { callClient } from 'rage-rpc';
import { Button, withStyles, createStyles } from '@material-ui/core';
import { CharacterSelectionConstants } from '~/constants/character-selection';

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

const PlayButton = ({ classes }) => {
    const handleClickPlay = () => {
        callClient(CharacterSelectionConstants.RPC.START_GAME);
    };

    return (
        <Button
            classes={ { root: classes.root } }
            size="large"
            color="primary"
            variant="contained"
            onClick={ handleClickPlay }
        >
            Play Now
        </Button>
    );
};

export default withStyles(styles)(PlayButton);

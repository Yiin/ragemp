import React, { useState } from 'react';
import { DateTime } from 'luxon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from  '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const Character = ({
    id,
    name,
    jobTitle = 'Hobo',
    lastPlayed,

    onClick,

    ...props
}) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleClickDelete = () => setConfirmDelete(true);
    const closeDeletionConfirmation = () => setConfirmDelete(false);
    const requestCharacterDeletion = () => {
        closeDeletionConfirmation();
        console.log('Character was deleted! (not really)');
    };

    return (
        <ListItem
            button
            alignItems="flex-start"
            onClick={ () => onClick(id) }
            { ...props }
        >
            <ListItemText
                primary={ name }
                secondary={
                    <React.Fragment>
                        <Typography component="span" color="textPrimary">
                            { jobTitle }
                        </Typography>
                        Last played: { DateTime.fromJSDate(lastPlayed).toRelative() }
                    </React.Fragment>
                }
            />
            <ListItemSecondaryAction>
                <IconButton onClick={ handleClickDelete }>
                    <DeleteIcon />
                </IconButton>
                <Dialog open={ confirmDelete } onClose={ closeDeletionConfirmation }>
                    <DialogTitle>
                        Delete { name }?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you really want to delete this character?
                            This action is irreversable.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ requestCharacterDeletion } color="secondary">
                            Yes, delete it.
                        </Button>
                        <Button onClick={ closeDeletionConfirmation }>
                            Nevermind
                        </Button>
                    </DialogActions>
                </Dialog>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Character;

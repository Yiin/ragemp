import React, { useState, MouseEventHandler, useMemo } from 'react';
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
import { callServer } from 'rage-rpc';
import { SharedConstants } from 'Shared/constants';
import { Character as CharacterType } from '~/../../shared/entity';

type Props = CharacterType & {
  jobTitle: string;
  lastPlayed: string;
  onClick: (id: number) => void;
  onDelete: () => void;
  [key: string]: any;
}

const Character: React.FC<Props> = ({
  id,
  name,
  jobTitle = 'Hobo',
  lastPlayed,

  onClick,
  onDelete,

  ...props
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleClickDelete = useMemo(() => () => {
    setConfirmDelete(true);
  }, []);

  const closeDeletionConfirmation = useMemo(() => () => {
    setConfirmDelete(false);
  }, []);

  const requestCharacterDeletion: MouseEventHandler = useMemo(() => async () => {
    await callServer(SharedConstants.User.RPC.DELETE_CHARACTER, id);
    closeDeletionConfirmation();
    onDelete();
  }, []);

  const lastPlayedRelative = DateTime.fromISO(lastPlayed).toRelative() || 'Never';

  return (
    <ListItem
      button
      alignItems="flex-start"
      onMouseDown={ () => onClick(id) }
      { ...props }
    >
      <ListItemText
        primary={ name }
        secondary={
          <React.Fragment>
            <Typography component="span" color="textPrimary">
              { jobTitle }
            </Typography>
            Last played: { lastPlayedRelative }
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

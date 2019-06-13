import React, { useState, useContext } from 'react';
import rpc from 'rage-rpc';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { SharedConstants } from 'Shared/constants';

import useInput from '~/scenes/Auth/hooks/useInput';
import { Context } from '../context';

type Props = {
  open: boolean;
  onClose: () => void;
};

const NameInputDialog: React.FC<Props> = ({ open, onClose }) => {
  const [firstName, setFirstName] = useInput('');
  const [lastName, setLastName] = useInput('');
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState(false);
  const { state } = useContext(Context);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await rpc.callServer(SharedConstants.CharacterCreation.RPC.CREATE_CHARACTER, {
        ...state,
        name,
      });
      // @ts-ignore: mp.trigger is available in CEF environment
      mp.trigger(SharedConstants.CharacterCreation.Events.CHARACTER_CREATED);
    } catch (e) {
      setError(e.name);
    }
    setSubmitting(false);
  };

  return (
    <Dialog
      open={ open }
      onClose={ onClose }
    >
      <DialogTitle id="form-dialog-title">
        Hello there, beautiful!
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={ setFirstName }
          onKeyDown={ handleSubmit }
          value={ firstName }
          autoFocus
          margin="dense"
          label="First name"
          error={ !!error }
          helperText={ error }
          fullWidth
        />
        <TextField
          onChange={ setLastName }
          onKeyDown={ handleSubmit }
          value={ lastName }
          margin="dense"
          label="Last name"
          error={ !!error }
          helperText={ error }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose } color="primary">
          Cancel
        </Button>
        <Button
          onClick={ handleSubmit }
          color="primary"
          disabled={ submitting }
        >
          Create character
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NameInputDialog;

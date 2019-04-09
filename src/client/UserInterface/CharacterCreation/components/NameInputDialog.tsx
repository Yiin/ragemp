import React, { useState, useContext, useEffect } from 'react';
import * as rpc from 'rage-rpc';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { SharedConstants } from 'Shared/constants';

import { Context } from '../context';
import { CharacterCreationConstants } from '~/constants/character-creation';

const NameInputDialog = ({ open, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState();
    const [submitting, setSubmitting] = useState(false);
    const { state } = useContext(Context);

    const handleNameChange = e => setName(e.target.value);
    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            console.log('calling', SharedConstants.CharacterCreation.RPC.CREATE_CHARACTER)
            await rpc.callServer(
                SharedConstants.CharacterCreation.RPC.CREATE_CHARACTER, {
                ...state,
                name,
            });
            // @ts-ignore mp.trigger is available in CEF environment
            mp.trigger(CharacterCreationConstants.Events.CHARACTER_CREATED);
        } catch (e) {
            console.log(e);
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
                    onChange={ handleNameChange }
                    value={ name }
                    autoFocus
                    margin="dense"
                    label="Character's name"
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

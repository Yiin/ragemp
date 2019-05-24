import React, { Fragment, useState, useContext } from 'react';
import * as rpc from 'rage-rpc';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import CreateIcon from '@material-ui/icons/PersonAdd';
import IconLeft from '@material-ui/icons/KeyboardArrowLeft';
import withStyles from '@material-ui/core/styles/withStyles';

import { Context as CharacterCreationContext } from '../context';
import SelectionOption from '../components/SelectionOption';
import SceneOption from '../components/SceneOption';
import SimpleOption from '../components/SimpleOption';
import NameInputDialog from '../components/NameInputDialog';
import { setGender, setRandomFeatures, setHeadOverlayValue, setHeadOverlayOpacity } from '../asm';
import { disabledOverlaysForGender } from '../data/head-overlays';
import { CharacterCreationConstants } from '~/constants/character-creation';

const styles = () => ({
    fixVerticalAlignment: {
        paddingTop: '1px',
    },
});

const Index = ({ classes }) => {
    const [ displayNameInputDialog, toggleDisplayNameInputDialog ] = useState(false);
    const { state, dispatch } = useContext(CharacterCreationContext);
    const { gender } = state;

    const genders = ['Male', 'Female'];

    const handleGenderChange = genderName => {
        dispatch(setGender(genders.indexOf(genderName)));

        disabledOverlaysForGender(genderName).forEach(id => {
            dispatch(setHeadOverlayValue(id, 255));
            dispatch(setHeadOverlayOpacity(id, 0));
        });
    }

    const showNameInputDialog = () => {
        toggleDisplayNameInputDialog(true);
    };

    const closeNameInputDialog = () => {
        toggleDisplayNameInputDialog(false);
    };

    const randomize = () => {
        dispatch(setRandomFeatures(gender));
    };

    const showCharacterSelectionScene = () => {
        rpc.callClient(CharacterCreationConstants.RPC.CANCEL_CHARACTER_CREATION);
    };

    return (
        <Fragment>
            <List>
                <ListSubheader>
                    Character Creation
                </ListSubheader>
                <SelectionOption
                    label="Gender"
                    options={ genders }
                    value={ genders[gender] }
                    onChange={ handleGenderChange }
                />
                <SceneOption label="Parents" to="/parents" />
                <SceneOption label="Features" to="/features" />
                <SceneOption label="Appearance" to="/appearance" />
                <SceneOption label="Hair & Colors" to="/hair-and-colors" />
            </List>
            <Divider />
            <SimpleOption
                label="Randomize"
                onClick={ randomize }
            />
            <Divider />
            <ListItem button onClick={ showNameInputDialog }>
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemText
                    classes={ { primary: classes.fixVerticalAlignment } }
                    primary="Create"
                />
            </ListItem>
            <ListItem button onClick={ showCharacterSelectionScene }>
                <ListItemIcon>
                    <IconLeft />
                </ListItemIcon>
                <ListItemText
                    classes={ { primary: classes.fixVerticalAlignment } }
                    primary="Cancel"
                />
            </ListItem>

            <NameInputDialog
                open={ displayNameInputDialog }
                onClose={ closeNameInputDialog }
            />
        </Fragment>
    );
};

export default withStyles(styles)(Index);

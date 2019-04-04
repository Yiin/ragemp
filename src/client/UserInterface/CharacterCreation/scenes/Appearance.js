import React, { Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import IconLeft from '@material-ui/icons/KeyboardArrowLeft';
import withStyles from '@material-ui/core/styles/withStyles';

import { Context as CharacterCreationContext } from '../context';
import SelectionOption from '../components/SelectionOption';
import SliderOption from '../components/SliderOption';
import SimpleOption from '../components/SimpleOption';
import { setHeadOverlayValue, setHeadOverlayOpacity } from '../asm';
import {
    headOverlayNames,
    getRandomOverlayItemValue,
    getRandomOverlayItemOpacity,
    headOverlayItemNames,
    disabledOverlaysForGender,
    hiddenOverlaysForGender,
} from '../data/head-overlays';

const styles = () => ({
    fixVerticalAlignment: {
        paddingTop: '1px',
    },
    list: {
        maxHeight: '70vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        paddingRight: '40px',
    },
    listItem: {
        paddingBottom: '10px',
    },
});

const Appearance = ({ classes, history }) => {
    const { state, dispatch } = useContext(CharacterCreationContext);
    const { gender, headOverlays } = state;

    const handleOverlayValueChange = overlayIndex =>
        value => dispatch(setHeadOverlayValue(
            overlayIndex,
            headOverlayItemNames[overlayIndex].indexOf(value)
        ));

    const handleOverlayOpacityChange = overlayIndex =>
        value => dispatch(setHeadOverlayOpacity(overlayIndex, value));

    const randomize = () => {
        Object.keys(headOverlayNames)
            .filter(overlayIndex => !disabledOverlaysForGender(gender)
                .includes(+overlayIndex))
            .forEach(overlayIndex => {
                dispatch(setHeadOverlayValue(
                    overlayIndex,
                    getRandomOverlayItemValue(overlayIndex)
                ));
                dispatch(setHeadOverlayOpacity(
                    overlayIndex,
                    getRandomOverlayItemOpacity(overlayIndex)
                ));
            });
    };

    const filteredHeadOverlays = headOverlayNames
        .reduce((obj, name, index) => (
            hiddenOverlaysForGender(gender).includes(index)
                ? obj
                : { ...obj, [index]: name }
        ), {});

    return (
        <Fragment>
            <List classes={ { root: classes.list } }>
                <ListSubheader color="primary" disableSticky>
                    Appearance
                </ListSubheader>
                { Object.entries(filteredHeadOverlays).map(([index, overlayName]) => (
                    <div key={ overlayName } className={ classes.listItem }>
                        <SimpleOption label={ overlayName } />
                        <SelectionOption
                            options={ headOverlayItemNames[index] }
                            value={ headOverlayItemNames[index][headOverlays[index].value] }
                            onChange={ handleOverlayValueChange(index) }
                        />
                        <SliderOption
                            value={ headOverlays[index].opacity }
                            onChange={ handleOverlayOpacityChange(index) }
                            min={ -1 }
                            max={ 1 }
                            step={ .01 }
                        />
                    </div>
                )) }
            </List>
            <Divider />
            <SimpleOption
                label="Randomize"
                onClick={ randomize }
            />
            <Divider />
            <ListItem button onClick={ () => history.push('/') }>
                <ListItemIcon>
                    <IconLeft />
                </ListItemIcon>
                <ListItemText
                    classes={ { primary: classes.fixVerticalAlignment } }
                    primary="Back"
                />
            </ListItem>
        </Fragment>
    );
};

export default withRouter(withStyles(styles)(Appearance));

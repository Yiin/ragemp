import React, { Fragment, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import IconLeft from '@material-ui/icons/KeyboardArrowLeft';
import withStyles from '@material-ui/core/styles/withStyles';

import hairColorImage from '../images/hair-colors.png';
import { Context as CharacterCreationContext } from '../context';
import SelectionOption from '../components/SelectionOption';
import SimpleOption from '../components/SimpleOption';
import ExpansionPanelOption from '../components/ExpansionPanelOption';

import {
    hairList,
    eyeColors,
    getRandomHair,
    getRandomHairColor,
    getRandomHairHighlightColor,
    getRandomEyeColor,
    getRandomBeardColor,
    getRandomEyebrowColor,
    getRandomBlushColor,
    getRandomLipstickColor,
    getRandomChestHairColor,
    MAX_LIPSTICK_COLOR,
    hairColors,
    blushColors,
} from '../data/hair-and-colors';
import {
    setHair,
    setHairHighlightColor,
    setHairColor,
    setEyeColor,
    setBeardColor,
    setEyebrowColor,
    setBlushColor,
    setLipstickColor,
    setChestHairColor,
} from '../asm';

const styles = theme => ({
    fixVerticalAlignment: {
        paddingTop: '1px',
    },
    list: {
        maxHeight: '70vh',
        overflowX: 'hidden',
        overflowY: 'scroll',
    },
    selection: {
        width: '230px',
    },
    colorWrapper: {
        display: 'inline-block',
        borderRadius: '100%',
        padding: '9px',
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, .1)',
        },
    },
    color: {
        width: '30px',
        height: '30px',
        display: 'inline-block',
        backgroundImage: `url(${hairColorImage})`,
        backgroundRepeat: 'no-repeat',
    },
});

const HairAndColors = ({ classes, history }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpansion = panel => (e, expanded) => {
        setExpanded(expanded ? panel : false);
    };

    const { state, dispatch } = useContext(CharacterCreationContext);
    const {
        gender,
        hair,
        hairColor,
        hairHighlightColor,
        eyeColor,
        beardColor,
        eyebrowColor,
        blushColor,
        lipstickColor,
        chestHairColor,
    } = state;

    const handleHairChange = value =>
        dispatch(setHair(hairList[gender]
            .findIndex(({ name }) => name === value)));
    const handleHairColorChange = value => dispatch(setHairColor(value));
    const handleHairHighlightColorChange = value => dispatch(setHairHighlightColor(value));
    const handleEyeColorChange = value => dispatch(setEyeColor(eyeColors.indexOf(value)));
    const handleBeardColorChange = value => dispatch(setBeardColor(value));
    const handleEyebrowColorChange = value => dispatch(setEyebrowColor(value));
    const handleBlushColorChange = blushColorName =>
        dispatch(setBlushColor(+Object.keys(blushColors)
            .find(key => blushColors[key] === blushColorName)));
    const handleLipstickColorChange = value => dispatch(setLipstickColor(value));
    const handleChestHairColorChange = value => dispatch(setChestHairColor(value));

    const randomize = () => {
        dispatch(setHair(getRandomHair(gender)));
        dispatch(setHairColor(getRandomHairColor()));
        dispatch(setHairHighlightColor(getRandomHairHighlightColor()));
        dispatch(setEyeColor(getRandomEyeColor()));
        dispatch(setBeardColor(getRandomBeardColor()));
        dispatch(setEyebrowColor(getRandomEyebrowColor()));
        dispatch(setBlushColor(getRandomBlushColor()));
        dispatch(setLipstickColor(getRandomLipstickColor()));
        dispatch(setChestHairColor(getRandomChestHairColor()));
    };

    const renderColor = color => (
        <div
            className={ classes.color }
            style={{
                backgroundPositionX: -(color % 13) * 30,
                backgroundPositionY: -Math.floor(color / 13) * 30,
            }}
        />
    );

    return (
        <Fragment>
            <List classes={{ root: classes.list }}>
                <ListSubheader disableSticky>
                    Hair & Colors
                </ListSubheader>
                <SelectionOption
                    classes={{ selection: classes.selection }}
                    label="Hair"
                    options={ hairList[gender].map(({ name }) => name) }
                    value={ hairList[gender][hair].name }
                    onChange={ handleHairChange }
                />
                <ExpansionPanelOption
                    label="Hair Color"
                    value={ renderColor(hairColor) }
                    expanded={ expanded === 'hairColor' }
                    onChange={ handleExpansion('hairColor') }
                >
                    { hairColors.map((color, index) => (
                        <div
                            key={ color }
                            className={ classes.colorWrapper }
                            onClick={ () => handleHairColorChange(index) }
                            style={{
                                ...(hairColor === index
                                    && { backgroundColor: 'rgba(0, 0, 0, .2)' }
                                ),
                            }}
                        >
                            { renderColor(index) }
                        </div>
                    )) }
                </ExpansionPanelOption>
                <ExpansionPanelOption
                    label="Hair Highlight"
                    value={ renderColor(hairHighlightColor) }
                    expanded={ expanded === 'hairHighlightColor' }
                    onChange={ handleExpansion('hairHighlightColor') }
                >
                    { hairColors.map((color, index) => (
                        <div
                            key={ color }
                            className={ classes.colorWrapper }
                            onClick={ () => handleHairHighlightColorChange(index) }
                            style={{
                                ...(hairHighlightColor === index
                                    && { backgroundColor: 'rgba(0, 0, 0, .2)' }
                                ),
                            }}
                        >
                            { renderColor(index) }
                        </div>
                    )) }
                </ExpansionPanelOption>
                <ExpansionPanelOption
                    label="Eyebrow Color"
                    value={ renderColor(eyebrowColor) }
                    expanded={ expanded === 'eyebrowColor' }
                    onChange={ handleExpansion('eyebrowColor') }
                >
                    { hairColors.map((color, index) => (
                        <div
                            key={ color }
                            className={ classes.colorWrapper }
                            onClick={ () => handleEyebrowColorChange(index) }
                            style={{
                                ...(eyebrowColor === index
                                    && { backgroundColor: 'rgba(0, 0, 0, .2)' }
                                ),
                            }}
                        >
                            { renderColor(index) }
                        </div>
                    )) }
                </ExpansionPanelOption>
                <ExpansionPanelOption
                    label="Beard Color"
                    value={ renderColor(beardColor) }
                    expanded={ expanded === 'beardColor' }
                    onChange={ handleExpansion('beardColor') }
                >
                    { hairColors.map((color, index) => (
                        <div
                            key={ color }
                            className={ classes.colorWrapper }
                            onClick={ () => handleBeardColorChange(index) }
                            style={{
                                ...(beardColor === index
                                    && { backgroundColor: 'rgba(0, 0, 0, .2)' }
                                ),
                            }}
                        >
                            { renderColor(index) }
                        </div>
                    )) }
                </ExpansionPanelOption>
                <SelectionOption
                    label="Eye Color"
                    options={ eyeColors }
                    value={ eyeColors[eyeColor] }
                    onChange={ handleEyeColorChange }
                    classes={{ selection: classes.selection }}
                />
                <SelectionOption
                    label="Blush Color"
                    options={ Object.values(blushColors) }
                    value={ blushColors[blushColor] }
                    onChange={ handleBlushColorChange }
                    classes={{ selection: classes.selection }}
                />
                <SelectionOption
                    label="Lipstick Color"
                    options={ [...Array(MAX_LIPSTICK_COLOR).keys()] }
                    value={ lipstickColor }
                    onChange={ handleLipstickColorChange }
                    classes={{ selection: classes.selection }}
                />
                <ExpansionPanelOption
                    label="Chest Hair Color"
                    value={ renderColor(chestHairColor) }
                    expanded={ expanded === 'chestHair' }
                    onChange={ handleExpansion('chestHair') }
                >
                    { hairColors.map((color, index) => (
                        <div
                            key={ color }
                            className={ classes.colorWrapper }
                            onClick={ () => handleChestHairColorChange(index) }
                            style={{
                                ...(chestHairColor === index
                                    && { backgroundColor: 'rgba(0, 0, 0, .2)' }
                                ),
                            }}
                        >
                            { renderColor(index) }
                        </div>
                    )) }
                </ExpansionPanelOption>
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
                    classes={{ primary: classes.fixVerticalAlignment }}
                    primary="Back"
                />
            </ListItem>
        </Fragment>
    );
};

export default withRouter(withStyles(styles)(HairAndColors));

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
import {
    fathers,
    mothers,
    getRandomFather,
    getRandomMother,
    getRandomResemblance,
} from '../data/parents';
import { setFather, setMother, setResemblance, setSkinTone } from '../asm';

const styles = () => ({
    fixVerticalAlignment: {
        paddingTop: '1px',
    },
    parentsPortraits: {
        display: 'flex',
        justifyContent: 'center',
    },
    parentPortrait: {
        borderRadius: '8px',

        '&:first-child': {
            marginRight: '22px',
        },
    },
});

const Parents = ({ classes, history }) => {
    const { state, dispatch } = useContext(CharacterCreationContext);
    const { gender, mother, father, resemblance, skinTone } = state;
    const motherName = mothers.find(({ id }) => id === mother).name;
    const fatherName = fathers.find(({ id }) => id === father).name;

    const handleMotherChange = newMotherName => dispatch(setMother(
        mothers.find(({ name }) => name === newMotherName).id
    ));
    const handleFatherChange = newFatherName => dispatch(setFather(
        fathers.find(({ name }) => name === newFatherName).id
    ));
    const handleResemblanceChange = resemblance => dispatch(setResemblance(resemblance));
    const handleSkinToneChange = skinTone => dispatch(setSkinTone(skinTone));

    const randomize = () => {
        dispatch(setMother(getRandomMother()));
        dispatch(setFather(getRandomFather()));
        dispatch(setResemblance(getRandomResemblance(gender)));
        dispatch(setSkinTone(getRandomResemblance()));
    };

    return (
        <Fragment>
            <List>
                <ListSubheader color="primary">
                    Parents
                </ListSubheader>
                <div className={ classes.parentsPortraits }>
                    <img
                        className={ classes.parentPortrait }
                        height="150"
                        src={ require(`../images/parents/${motherName}.png`) }
                    />
                    <img
                        className={ classes.parentPortrait }
                        height="150"
                        src={ require(`../images/parents/${fatherName}.png`) }
                    />
                </div>
                <SelectionOption
                    label="Mom"
                    options={ mothers.map(mother => mother.name) }
                    value={ motherName }
                    onChange={ handleMotherChange }
                />
                <SelectionOption
                    label="Dad"
                    options={ fathers.map(father => father.name) }
                    value={ fatherName }
                    onChange={ handleFatherChange }
                />
                <SliderOption
                    label="Resemblance 👩 🡒 👨"
                    value={ resemblance }
                    onChange={ handleResemblanceChange }
                    min={ 0 }
                    max={ 1 }
                    step={ 0.01 }
                />
                <SliderOption
                    label="Skin tone 👩 🡒 👨"
                    value={ skinTone }
                    onChange={ handleSkinToneChange }
                    min={ 0 }
                    max={ 1 }
                    step={ 0.01 }
                />
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

export default withRouter(withStyles(styles)(Parents));

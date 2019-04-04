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
import SliderOption from '../components/SliderOption';
import SimpleOption from '../components/SimpleOption';
import { featureNames, getRandomFeatureValue } from '../data/features';
import { setFeature } from '../asm';

const styles = () => ({
    fixVerticalAlignment: {
        paddingTop: '1px',
    },
    list: {
        maxHeight: '70vh',
        overflowX: 'hidden',
        overflowY: 'auto',
    },
});

const Features = ({ classes, history }) => {
    const { state, dispatch } = useContext(CharacterCreationContext);
    const { features } = state;

    const handleFeatureChange = featureIndex =>
        value => dispatch(setFeature(featureIndex, value));

    const randomize = () => {
        Object.keys(features).forEach(featureIndex => {
            dispatch(setFeature(featureIndex, getRandomFeatureValue()));
        });
    };

    return (
        <Fragment>
            <List classes={ { root: classes.list } }>
                <ListSubheader color="primary" disableSticky>
                    Features
                </ListSubheader>
                { featureNames.map((featureName, index) => (
                    <SliderOption
                        key={ featureName }
                        label={ featureName }
                        value={ features[index] }
                        onChange={ handleFeatureChange(index) }
                        min={ -1 }
                        max={ 1 }
                        step={ .01 }
                    />
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

export default withRouter(withStyles(styles)(Features));

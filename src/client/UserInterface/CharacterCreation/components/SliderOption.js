import React, { useState, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from '@material-ui/lab/Slider';

const styles = () => ({
    fixVerticalAlignment: {
        paddingTop: '1px',
    },
    sliderWrapper: {
        width: '40%',
        padding: '10px',
    },
    fullWidthSliderWrapper: {
        width: '100%',
        right: 'auto',
    },
    slider: {
        padding: '22px 0px',
    },
});

const SliderOption = ({
    classes,
    label,
    value,
    onChange,
    ...props
}) => {
    const handleChange = (_, value) => {
        onChange(value);
    };

    return (
        <ListItem>
            <ListItemText>
                { label }

                <ListItemSecondaryAction
                    classes={ {
                        root: label
                            ? classes.sliderWrapper
                            : classes.fullWidthSliderWrapper,
                    } }
                >
                    <Slider
                        value={ value }
                        onChange={ handleChange }
                        classes={ {
                            root: classes.slider,
                        } }
                        { ...props }
                    />
                </ListItemSecondaryAction>
            </ListItemText>
        </ListItem>
    );
}

export default withStyles(styles)(SliderOption);

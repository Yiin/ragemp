import React from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles';

const ExpansionPanel = withStyles({
    root: {
        border: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles(theme => ({
    root: {
        paddingLeft: theme.spacing.unit * 2,
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
}))(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles({
    root: {
        flexWrap: 'wrap',
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: 0,
        paddingBottom: 0,
        maxHeight: '250px',
    },
})(MuiExpansionPanelDetails);

const styles = {
    column: {
        flexBasis: '50%',
        height: '24px',
        '&:last-child': {
            display: 'flex',
            justifyContent: 'center',
            paddingRight: '23px',
        },
    },
};

const ExpansionPanelOption = ({
    classes,
    label,
    value,
    children,
    ...props,
}) => (
    <ExpansionPanel elevation={ 0 } { ...props }>
        <ExpansionPanelSummary expandIcon={ <ExpandMoreIcon /> }>
            <div className={ classes.column }>
                <Typography variant="subheading">
                    { label }
                </Typography>
            </div>
            <div className={ classes.column}>
                { value }
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            { children }
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

export default withStyles(styles)(ExpansionPanelOption);

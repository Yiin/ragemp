import React, { useState, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { MuiThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { theme } from '../_theme';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        margin: theme.spacing.unit * 10,
        backdropFilter: 'blur(10px)',
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

const Storylines = ({ classes }) => {
    const [open, setOpen] = useState(false);
    const handleClick = useMemo(() => () => {
        setOpen(!open);
    }, [open]);

    return (
        <MuiThemeProvider theme={ theme }>
            <List
                component="nav"
                subheader="sadfsadf"
                className={ classes.root }
            >
                <ListItem button>
                    <ListItemIcon>
                    <SendIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Sent email" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                    <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Drafts" />
                </ListItem>
                <ListItem button onClick={ handleClick }>
                    <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Inbox" />
                    { open ? <ExpandLess /> : <ExpandMore /> }
                </ListItem>
                <Collapse in={ open } timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={ classes.nested }>
                            <ListItemIcon>
                            <StarBorder />
                            </ListItemIcon>
                            <ListItemText inset primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </MuiThemeProvider>
    );
};

export default hot(withStyles(styles)(Storylines));

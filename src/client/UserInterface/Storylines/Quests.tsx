import React, { useState, useMemo } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
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

const styles = (theme: Theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        margin: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

const Quests = ({ classes }) => {
    const [open, setOpen] = useState(false);
    const handleClick = useMemo(() => () => {
        setOpen(!open);
    }, [open]);

    return (
        <List
            component="nav"
            subheader={ <ListSubheader>Quests</ListSubheader> }
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
                <List disablePadding>
                    <ListItem button className={ classes.nested }>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText inset primary="Starred" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
};

export default withStyles(styles)(Quests);

import * as React from "react";
import WeekView from "../../Components/WeekView/WeekView";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = (theme: Theme) => (
    {
        root: {
            display: 'flex',
            height: '95vh'
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            height: 64
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            paddingTop: 64,
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }
);

interface ICalendarProps {
    classes: any
}

class Calendar extends React.Component<ICalendarProps>{
    constructor(props: ICalendarProps) {
        super(props);
    }

    render () {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar
                    className={classes.appBar}
                    position={"fixed"}
                >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    className={classes.content}
                >
                    <WeekView/>
                </main>
            </div>
        )
    }
}

export default withStyles(useStyles)(Calendar);
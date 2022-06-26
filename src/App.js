/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-24 23:37:56
 * @LastEditTime: 2022-06-26 21:09:12
 * @FilePath: /strongbox/src/App.js
 * @Description: 
 * @Encoding: UTF-8
 */
import React, { Component } from "react";


import BoxItems from './BoxItems';
import BoxesList from './BoxesList';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Collapse from '@mui/material/Collapse';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { styled } from '@mui/material/styles';

const fs = window.require("fs");
const process = window.require("process");
const USER_HOME = process.env.HOME || process.env.USERPROFILE
const DATA_PATH = USER_HOME + "/.strongbox";
const BOXES_LIST_FILE = DATA_PATH + "/boxes.json";
const BOXES_PATH = DATA_PATH + "/boxes";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default class App extends Component {
    constructor(props) {
        super(props);

        // create data folder if not exists
        if (!fs.existsSync(DATA_PATH)) {
            fs.mkdirSync(DATA_PATH);
        }
        if (!fs.existsSync(BOXES_PATH)) {
            fs.mkdirSync(BOXES_PATH);
        }

        // load data
        var boxes = [];
        if (fs.existsSync(BOXES_LIST_FILE)) {
            boxes = JSON.parse(fs.readFileSync(BOXES_LIST_FILE));
        } else {
            fs.writeFileSync(BOXES_LIST_FILE, JSON.stringify(boxes));
        }

        this.state = {
            boxes: boxes,
            alert_open: false,
            alert_type: "",
            alert_title: "",
            alert_message: "",

            showBoxesBar: false,
            showBoxItems: false,
            showBoxName: "Select a box",
        };
    }

    setAlert = (type, title, message) => {
        this.setState({
            alert_open: true,
            alert_type: type,
            alert_title: title,
            alert_message: message,
        });
    }

    boxesOnChange = (boxes) => {
        this.setState({
            boxes: boxes,
        });
        fs.writeFile(BOXES_LIST_FILE, JSON.stringify(boxes), (err) => {
            if (err) {
                console.log(err);
                this.SetAlert("error", "Configuration Saved Error", err.message);
            }
        });
    }

    boxOnClick = (boxName) => {
        this.setState({
            showBoxItems: true,
            showBoxName: boxName,
        });
    }

    handleDrawerOpen = () => {
        this.setState({ showBoxesBar: true });
    }

    handleDrawerClose = () => {
        this.setState({ showBoxesBar: false });
    }

    render() {
        return <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={this.state.showBoxesBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(this.state.showBoxesBar && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Strong Box
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={this.state.showBoxesBar}>
                <DrawerHeader>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <BoxesList
                    showBoxesBar={this.state.showBoxesBar}
                    boxes={this.state.boxes}
                    boxesPath={BOXES_PATH}
                    boxOnClick={this.boxOnClick}
                    boxesOnChange={this.boxesOnChange}
                    drawerOpen={this.handleDrawerOpen}
                    setAlert={this.setAlert}
                />
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Collapse in={this.state.alert_open}>
                    {
                        <Alert
                            sx={{ mb: 2 }}
                            severity={this.state.alert_type}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => this.setState({ alert_open: false })}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            } >
                            <AlertTitle>{this.state.alert_title}</AlertTitle>
                            {this.state.alert_message}
                        </Alert>
                    }
                </Collapse>
                <BoxItems
                    boxName={this.state.showBoxName}
                    boxesPath={BOXES_PATH}
                    setAlert={this.setAlert}
                />

            </Box>


        </Box>
    }
}

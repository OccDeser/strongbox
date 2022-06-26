/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-25 22:33:12
 * @LastEditTime: 2022-06-26 13:16:44
 * @FilePath: /strongbox/src/Boxes.js
 * @Description: Show all boxes
 * @Encoding: UTF-8
 */

import BoxItems from "./BoxItems";
import React, { Component } from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';

import AddBoxIcon from '@mui/icons-material/AddBox';

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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
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



export default class Boxes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newBox: "",
            boxes: props.boxes,
            boxesPath: props.boxesPath,

            showBoxesBar: false,
            showBoxName: "123123",
        }
    }

    addBox = () => {
        const box = this.state.newBox
        if (box === "") {
            this.props.setAlert("warning", "Warning", "Box name cannot be empty!")
            return;
        }

        if (this.state.boxes.indexOf(box) !== -1) {
            this.props.setAlert("warning", "Warning", "Box name already exists!")
            return;
        }

        var boxes = [...this.state.boxes, this.state.newBox];
        this.props.boxesOnChange(boxes);
        this.setState({
            boxes: boxes,
            newBox: "",
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
                <List>
                    {this.state.boxes.map((box, ind) => (
                        <ListItem key={box + ind} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: this.state.showBoxesBar ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                onClick={() => {
                                    console.log(`Open ${box}`);
                                    this.setState({ showBoxName: box })
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: this.state.showBoxesBar ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {ind + 1 === 1 && <LooksOneIcon />}
                                    {ind + 1 === 2 && <LooksTwoIcon />}
                                    {ind + 1 === 3 && <Looks3Icon />}
                                    {ind + 1 === 4 && <Looks4Icon />}
                                    {ind + 1 === 5 && <Looks5Icon />}
                                    {ind + 1 === 6 && <Looks6Icon />}
                                </ListItemIcon>
                                <ListItemText primary={box} sx={{ opacity: this.state.showBoxesBar ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <BoxItems
                    boxName={this.state.showBoxName}
                    boxesPath={this.state.boxesPath}
                />
            </Box>


        </Box >;
    }
}



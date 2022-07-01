/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-25 22:33:12
 * @LastEditTime: 2022-07-01 22:44:18
 * @FilePath: /strongbox/src/BoxesList.js
 * @Description: Show all boxes
 * @Encoding: UTF-8
 */

import LetterIcon from "./LetterIcon";

import React, { Component } from "react";
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const fs = window.require("fs");

export default class BoxesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newBox: "",
            boxes: props.boxes,
            boxesPath: props.boxesPath,

            showBoxesBar: false,
            showBoxName: "123123",

            openRemoveDialog: false,
            removeBoxName: "",
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

    removeBox = () => {
        var boxes = [...this.state.boxes];
        boxes.splice(this.state.boxes.indexOf(this.state.removeBoxName), 1);
        var remove_file = this.state.boxesPath + "/" + this.state.removeBoxName;
        fs.access(remove_file, (err) => {
            if (!err) {
                fs.unlink(remove_file, (err) => {
                    if (err) {
                        this.props.setAlert("error", "Error", `Remove box ${this.state.removeBoxName} failed!`);
                        return;
                    }
                });
            }
        });

        this.props.boxesOnChange(boxes);
        this.setState({
            boxes: boxes,
            openRemoveDialog: false,
        });
    }

    closeRemoveDialog = () => {
        this.setState({
            openRemoveDialog: false,
        });
    }

    render() {
        return <List>
            <Dialog
                open={this.state.openRemoveDialog}
                onClose={this.closeRemoveDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Do you want to remove box ${this.state.removeBoxName}?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The deletion operation is irreversible. Do you still insist on deleting the box {this.state.removeBoxName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeRemoveDialog}>No</Button>
                    <Button onClick={this.removeBox} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>

            {this.state.boxes.map((box, ind) => (
                <ListItem key={box + ind} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: this.props.showBoxesBar ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => {
                            console.log(`Open ${box}`);
                            this.props.boxOnClick(box);
                        }}>
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: this.props.showBoxesBar ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <LetterIcon letter={box[0]} color="#F5F5F5" backgroundColor="#708090" />
                        </ListItemIcon>

                        <ListItemText sx={{ opacity: this.props.showBoxesBar ? 1 : 0 }} >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <span>{box}</span>
                                <Button variant="text" onClick={() => {
                                    this.setState({ removeBoxName: box, openRemoveDialog: true })
                                }}>
                                    del
                                </Button>
                            </Stack>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: this.props.showBoxesBar ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={this.props.drawerOpen}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            this.addBox();
                        }
                    }}>
                    {!this.props.showBoxesBar && <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: this.props.showBoxesBar ? 3 : 'auto',
                            justifyContent: 'center'
                        }}
                    >
                        <LetterIcon letter='+' color="#F5F5F5" backgroundColor="#708090" />
                    </ListItemIcon>}
                    <ListItemText sx={{ opacity: this.props.showBoxesBar ? 1 : 0 }} >
                        <TextField label="New Box" value={this.state.newBox} onChange={(e) => this.setState({ newBox: e.target.value })} />
                    </ListItemText>
                </ListItemButton>
            </ListItem>
        </List>;
    }
}



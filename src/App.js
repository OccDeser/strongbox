/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-24 23:37:56
 * @LastEditTime: 2022-06-26 00:47:43
 * @FilePath: /strongbox/src/App.js
 * @Description: 
 * @Encoding: UTF-8
 */

import Boxes from './Boxes';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import React, { Component } from "react";

const fs = window.require("fs");
const process = window.require("process");
const USER_HOME = process.env.HOME || process.env.USERPROFILE
const DATA_PATH = USER_HOME + "/.strongbox";
const BOXES_LIST_FILE = DATA_PATH + "/boxes.json";
const BOXES_PATH = DATA_PATH + "/boxes";

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

    render() {
        return <>
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

            <Boxes boxes={this.state.boxes} boxesPath={BOXES_PATH} boxesOnChange={this.boxesOnChange} setAlert={this.setAlert} />
        </>;
    }
}

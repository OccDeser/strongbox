/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-24 23:37:56
 * @LastEditTime: 2022-06-25 00:30:17
 * @FilePath: /strongbox/src/App.js
 * @Description: 
 * @Encoding: UTF-8
 */

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { Component } from "react";

const fs = window.require("fs");

export default class App extends Component {
    state = {
        item_name: "",
        item_content: ""
    }

    save = () => {
        var file = "data.txt"
        fs.access(file, (err) => {
            var data = {}
            if (!err) {
                data = JSON.parse(fs.readFileSync(file))
            }
            data[this.state.item_name] = this.state.item_content
            fs.writeFileSync("data.txt", JSON.stringify(data));
        })
    }

    set_item_name = (e) => {
        this.setState({ item_name: e.target.value })
    }

    set_item_content = (e) => {
        this.setState({ item_content: e.target.value })
    }


    render() {
        return <>
            <TextField id="outlined-basic" label="Name"  onChange={this.set_item_name} />
            <TextField id="outlined-basic" label="Content" onChange={this.set_item_content} />
            <Button variant="contained" onClick={this.save}>Save</Button>
        </>;
    }
}

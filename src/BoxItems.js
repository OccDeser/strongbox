/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-25 22:50:38
 * @LastEditTime: 2022-06-26 01:47:56
 * @FilePath: /strongbox/src/BoxItems.js
 * @Description: Show all items in a box
 * @Encoding: UTF-8
 */

import React, { Component } from "react";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

export default class BoxItems extends Component {
    render() {
        return <Slide direction={this.props.direction} in={this.props.show} mountOnEnter unmountOnExit>
            <div>
                {this.props.boxName}
                <Button variant="contained" color="primary" onClick={this.props.exitBox}> Exit </Button>
            </div>
        </Slide>;
    }
}

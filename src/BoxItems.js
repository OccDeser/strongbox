/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-25 22:50:38
 * @LastEditTime: 2022-06-26 13:15:29
 * @FilePath: /strongbox/src/BoxItems.js
 * @Description: Show all items in a box
 * @Encoding: UTF-8
 */

import React, { Component } from "react";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

export default class BoxItems extends Component {
    

    render() {
        return <div>
            {this.props.boxName}
        </div>;
    }
}

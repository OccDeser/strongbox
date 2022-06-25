/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-25 22:33:12
 * @LastEditTime: 2022-06-26 01:51:35
 * @FilePath: /strongbox/src/Boxes.js
 * @Description: Show all boxes
 * @Encoding: UTF-8
 */

import BoxItems from "./BoxItems";
import React, { Component } from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

function BoxRow(props) {
    return (
        <Stack direction="row">
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField
                        label={props.label}
                        value={props.value}
                        onChange={props.onChange}
                        InputProps={props.InputProps}
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.buttonOnClick}>
                        {props.buttonName}
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
}

export default class Boxes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newBox: "",
            boxes: props.boxes,
            boxesPath: props.boxesPath,

            showBoxItems: false,
            showBoxName: "",
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

    render() {
        return <>
            <BoxItems
                direction="left"
                show={this.state.showBoxItems}
                boxName={this.state.showBoxName}
                boxesPath={this.state.boxesPath}
                exitBox={() => this.setState({ showBoxItems: false })}
            />
            
            <Slide direction="right" in={!this.state.showBoxItems} mountOnEnter unmountOnExit>
                <Stack spacing={2}>
                    {this.state.boxes.map((box, ind) => <Item key={box + ind}>
                        <BoxRow
                            value={box}
                            label={"Box " + (ind + 1)}
                            InputProps={{ readOnly: true }}
                            buttonOnClick={() => this.setState({ showBoxItems: true, showBoxName: box })}
                            buttonName="Open"
                        />
                    </Item>)}
                    <Item>
                        <BoxRow
                            label="New Box"
                            value={this.state.newBox}
                            onChange={(e) => { this.setState({ newBox: e.target.value }) }}
                            buttonOnClick={this.addBox}
                            buttonName="add"
                        />
                    </Item>
                </Stack >
            </Slide>
        </>;
    }
}



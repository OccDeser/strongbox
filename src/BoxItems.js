/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-25 22:50:38
 * @LastEditTime: 2022-06-27 12:49:38
 * @FilePath: /strongbox/src/BoxItems.js
 * @Description: Show all items in a box
 * @Encoding: UTF-8
 */

import React, { Component } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

const fs = window.require("fs");
const crypto = window.require("crypto");

export default class BoxItems extends Component {
    state = {
        show: false,
        boxData: [],

        new_name: "",
        new_value: "",
    }

    genKey = (pwd) => {
        const hash = crypto.createHash("md5");
        hash.update(pwd);
        const pwdHash = hash.digest("hex");

        const sha256 = crypto.createHash("sha256");
        sha256.update(pwd + pwdHash);
        const key = sha256.digest();
        return key;
    }

    loadData = (fileData) => {
        const { boxpwd } = this.props;
        const key = this.genKey(boxpwd);
        const data = Buffer.from(fileData, "base64").toString("hex");
        const iv = data.slice(0, 16);
        const ciphertext = data.slice(16);

        try {
            const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
            var decrypted = decipher.update(ciphertext, "hex", "utf8");
            decrypted += decipher.final("utf8");
        } catch (e) {
            console.log(e);
            this.props.setAlert("error", "Box Data Decrypt Error", e.message);
            return [];
        }


        return JSON.parse(decrypted);
    }

    dumpData = (boxData) => {
        const data = Buffer.from(JSON.stringify(boxData));

        const { boxpwd } = this.props;
        const key = this.genKey(boxpwd);
        const iv = crypto.randomBytes(16).toString("hex").slice(0, 16);

        const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
        var encrypted = cipher.update(data, "utf8", "hex");
        encrypted += cipher.final("hex");

        const fileData = Buffer.from(iv + encrypted, "hex").toString("base64");

        return fileData;
    }

    newBoxItem = () => {
        var boxData = this.state.boxData;
        const new_name = this.state.new_name;
        const new_value = this.state.new_value;
        if (new_name !== "" && new_value !== "") {
            boxData.push([new_name, new_value]);
            this.setState({
                boxData: boxData,
                new_name: "",
                new_value: "",
            });
        }

        const { boxName, boxesPath } = this.props;
        const boxFile = boxesPath + "/" + boxName;
        fs.writeFile(boxFile, this.dumpData(boxData), (err) => {
            if (err) {
                this.props.setAlert("error", "Box Data Saved Error", err.message);
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.boxName !== this.props.boxName) {
            const { boxName, boxesPath } = this.props;
            const boxFile = boxesPath + "/" + boxName;

            var boxData = [];
            var show = true;
            if (!fs.existsSync(boxFile)) {
                fs.writeFile(boxFile, this.dumpData(boxData), (err) => {
                    if (err) {
                        console.log(err);
                        this.props.setAlert("error", "Box Data Saved Error", err.message);
                        show = false;
                    }
                    this.setState({
                        show: show,
                        boxData: boxData,
                    });
                });
            } else {
                fs.readFile(boxFile, (err, data) => {
                    if (err) {
                        console.log(err);
                        this.props.setAlert("error", "Box Data Read Error", err.message);
                        show = false;
                    } else {
                        boxData = this.loadData(data.toString());
                    }
                    this.setState({
                        show: show,
                        boxData: boxData,
                    });
                });
            }

            this.setState({
                new_name: "",
                new_value: "",
            });
        }
    }

    render() {
        var tableData = [];
        if (this.state.boxData.length > 0) {
            tableData = this.state.boxData.map((item) => {
                return {
                    name: item[0],
                    value: item[1],
                }
            });
        }

        return <>
            {
                this.state.show && <div style={{ marginTop: -15 }}>
                    <div style={{ marginLeft: 10 }}><h4>{`Box ${this.props.boxName}`}</h4></div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>name</TableCell>
                                    <TableCell>value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tableData.map((row) => (
                                        <TableRow key={row.name + row.value}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.value}</TableCell>
                                        </TableRow>
                                    ))
                                }
                                <TableRow key={"New Item"} onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        this.newBoxItem();
                                    }
                                }} >
                                    <TableCell>
                                        <TextField
                                            variant="standard" label="new name" value={this.state.new_name}
                                            onChange={(e) => {
                                                this.setState({
                                                    new_name: e.target.value,
                                                });
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            variant="standard" label="new value" value={this.state.new_value}
                                            onChange={(e) => {
                                                this.setState({
                                                    new_value: e.target.value,
                                                });
                                            }}
                                        />
                                    </TableCell>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </>;
    }
}

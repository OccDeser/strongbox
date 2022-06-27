/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-27 12:27:53
 * @LastEditTime: 2022-06-27 12:35:22
 * @FilePath: /strongbox/src/CustomDialog.js
 * @Description: 
 * @Encoding: UTF-8
 */

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SettingDialog(props) {
    const { open, onClose, setCustomPwd } = props;
    
    const [pwd, setPwd] = React.useState("");

    const pwdOnChange = (event) => {
        setPwd(event.target.value);
    }


    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Hello</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Welcome to Strongbox. You've set a custom password.
                        Please enter it below to unlock your data.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        variant="standard"
                        value={pwd}
                        onChange={pwdOnChange}
                        label="Custom Password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        console.log("save", pwd);
                        setCustomPwd(pwd);
                        onClose();
                    }}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

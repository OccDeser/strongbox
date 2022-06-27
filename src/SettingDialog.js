/*
 * @Author: OccDeser 2287109950@qq.com
 * @Date: 2022-06-27 11:29:24
 * @LastEditTime: 2022-06-27 11:57:26
 * @FilePath: /strongbox/src/SettingDialog.js
 * @Description: Open setting dialog for user to change settings
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
    const { open, customPwd, enableCustomPwd, onClose, setCustomPwd, enableCustomPwdOnChange } = props;
    const [pwd, setPwd] = React.useState(customPwd);

    const pwdOnChange = (event) => {
        setPwd(event.target.value);
    }

    const handleEnableCustomPwd = (event) => {
        enableCustomPwdOnChange(event.target.checked);
    }

    const saveData = () => {
        setCustomPwd(pwd);
        onClose();
    }


    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Custom password is used to encrypt your data.
                    </DialogContentText>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch
                                checked={enableCustomPwd}
                                onChange={handleEnableCustomPwd}
                            />}
                            label="Custom Password"
                        />
                        <TextField
                            autoFocus
                            disabled={!enableCustomPwd}
                            margin="dense"
                            variant="standard"
                            value={pwd}
                            onChange={pwdOnChange}
                            label="Custom Password"
                            fullWidth
                        />
                    </FormGroup>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={saveData}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

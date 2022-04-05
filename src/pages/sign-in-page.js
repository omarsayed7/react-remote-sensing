import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';

export const SignInPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUserName = (text) => {
        setUserName(text)
    }
    const onChangePassword = (text) => {
        setPassword(text)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginTop: 150,marginLeft: 650, backgroundColor: 'white' }}>
                <div style={{ padding: 20, width: '100%', height: '30%', backgroundColor: 'white' }}>
                <h1>Sign-In</h1>
                </div>
                <div style={{ display: 'flex', marginTop: '10%', width: "100%", height: 10 }}>
                    <TextField
                        variant="outlined"
                        onChange={onChangeUserName}
                        value={username}
                        style={{ width: "100%" }}
                        label={"Username"}
                    />
                </div>
                <div style={{ display: 'flex', marginTop: '30%', width: "100%", height: 10 }}>
                    <TextField
                        variant="outlined"
                        onChange={onChangePassword}
                        value={password}
                        style={{ width: "100%" }}
                        label={"Password"}
                    />
                </div>
                <div style={{ display: 'flex', marginTop: '30%' }}>
                    <Button variant="outlined">
                        Sign-In
                    </Button>
                </div>
            </div>
        </div>
    )
};
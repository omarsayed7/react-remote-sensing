import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HeaderComponent } from "../components/header-component"
import { signInService } from "../services";
import { Navigate } from "react-router-dom";
const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#FFFF',
            contrastText: '#fff',
        },
    },
});

export const SignInPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [islogged, setIsLogged] = useState(false)
    const onChangeUserName = (text) => {
        setUserName(text.target.value)
    }
    const onChangePassword = (text) => {
        setPassword(text.target.value)
    }
    const onSubmit = async () => {
        const signInData = {
            "Username": username,
            "Password": password
        }
        console.log(signInData, "info")
        const signInResponse = await signInService(signInData);
        console.log(signInResponse)
        if (signInResponse.message === 'LoggedIn') {
            console.log("hello")
            localStorage.setItem("isLogged", true)
            setIsLogged(true)
        }
    }
    const test = () => {
        localStorage.setItem("isLogged", true)
    }
    if (localStorage.getItem('isLogged')) {
        console.log("logggg")
        console.log(localStorage.getItem('isLogged'))
        return <Navigate to={"/home"} />
    }
    return (
        <div >
            <HeaderComponent showBackButton={true} islogged={false} iscontacted={false} isabout={false} backgroundColor={'blue'} textColor={'white'} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div style={{ marginTop: 150, marginLeft: 650, backgroundColor: 'white' }}>
                    <div style={{ padding: 20, width: '100%', height: '30%', backgroundColor: 'white' }}>
                        <h1 style={{ color: 'blue' }}>Sign-In</h1>
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
                            type={"password"}
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: '30%' }}>
                        <ThemeProvider theme={theme}>
                            <Button onClick={onSubmit} variant="outlined" color="primary" style={{ fontWeight: "bold", borderWidth: 3, borderRadius: 20 }}>
                                Sign-In
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    )
};
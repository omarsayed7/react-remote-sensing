import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HeaderComponent } from "../components/header-component"
import { signUpService } from "../services";

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
const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const SignUpPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    //Handling Modal View
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);


    const onChangeFirstName = (text) => {
        setFirstName(text.target.value)
    }
    const onChangeLastName = (text) => {
        setLastName(text.target.value)
    }
    const onChangeUserName = (text) => {
        setUserName(text.target.value)
    }
    const onChangeEmail = (text) => {
        setEmail(text.target.value)
    }
    const onChangePassword = (text) => {
        setPassword(text.target.value)
    }
    const onChangeRePassword = (text) => {
        setRePassword(text.target.value)
    }
    const onSubmit = async () => {
        const signUpData = {
            "FirstName": firstName,
            "LastName": lastName,
            "Username": username,
            "Email": email,
            "Password": password
        }
        const signUpResponse = await signUpService(signUpData);
        if (signUpResponse.message === "Created!") {
            setIsSignUp(true)
        }
    }
    if (isSignUp) {
        return <Navigate to={"/sign-in-page"} />
    }
    return (

        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ModalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {"Warning"}
                    </Typography>
                    {"Passwords don't match or Both are empty"}
                </Box>
            </Modal>
            <HeaderComponent showBackButton={true} islogged={false} iscontacted={false} isabout={false} backgroundColor={'blue'} textColor={'white'} />
            <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>

                <div style={{ marginTop: 30, backgroundColor: 'white' }}>
                    <div style={{ padding: 15, width: '100%', height: '20%', backgroundColor: 'white' }}>
                        <h1 style={{ color: 'blue' }}>Sign-Up</h1>
                    </div>
                    <div style={{ padding: 10, backgroundColor: 'white' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between' }}>
                            <TextField
                                variant="outlined"
                                onChange={onChangeFirstName}
                                value={firstName}
                                style={{ width: "50%", height: 10, paddingRight: "10%" }}
                                label={"First Name"}
                            />
                            <TextField
                                variant="outlined"
                                onChange={onChangeLastName}
                                value={lastName}
                                style={{ width: "50%", height: 10, paddingRight: "10%" }}
                                label={"Last Name"}
                            />
                        </div>
                        <div style={{ display: 'flex', marginTop: '15%', width: "90%", height: 10 }}>
                            <TextField
                                variant="outlined"
                                onChange={onChangeUserName}
                                value={username}
                                style={{ width: "100%" }}
                                label={"Enter Your Username"}
                            />
                        </div>
                        <div style={{ display: 'flex', marginTop: '15%', width: "90%", height: 10 }}>
                            <TextField
                                variant="outlined"
                                onChange={onChangeEmail}
                                value={email}
                                style={{ width: "100%" }}
                                label={"Enter Your E-mail"}
                            />
                        </div>
                        <div style={{ display: 'flex', marginTop: '15%', width: "90%", height: 10 }}>
                            <TextField
                                multiline
                                rows={1}
                                variant="outlined"
                                onChange={onChangePassword}
                                value={password}
                                style={{ width: "100%" }}
                                label={"Enter Your Password"}
                            />
                        </div>
                        <div style={{ display: 'flex', marginTop: '15%', width: "90%", height: 10 }}>
                            <TextField
                                variant="outlined"
                                onChange={onChangeRePassword}
                                value={repassword}
                                style={{ width: "100%" }}
                                label={"Re-enter The Password"}
                            />
                        </div>
                        <div style={{ display: 'flex', marginTop: '15%', marginLeft: '33%' }}>
                            <ThemeProvider theme={theme}>
                                <Button onClick={onSubmit} variant="outlined" color="primary" style={{ fontWeight: "bold", borderWidth: 3, borderRadius: 20 }}>
                                    Sign-up
                                </Button>
                            </ThemeProvider>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
};
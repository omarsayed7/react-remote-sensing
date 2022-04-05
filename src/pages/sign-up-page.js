import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


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
//Handling Modal View
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);
    
    
    const onChangeFirstName = (text) => {
        setFirstName(text)
    }
    const onChangeLastName = (text) => {
        setLastName(text)
    }
    const onChangeUserName = (text) => {
        setUserName(text)
    }
    const onChangeEmail = (text) => {
        setEmail(text)
    }
    const onChangePassword = (text) => {
        setPassword(text)
    }
    const onChangeRePassword = (text) => {
        setRePassword(text)
    }
    const passCheck = () => {
        console.log(password,"password")
        console.log(repassword,"repassword")
        if (password !== repassword || password === repassword === ''){
            console.log("Passwords don't match")
        }
    }
    
    return (
        
        <div style={{ display: 'flex', flexDirection: 'row' }}>
      
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
           
            <div style={{ marginTop: 60,marginLeft: 550, backgroundColor: 'white' }}>
            <div style={{ padding: 20, width: '100%', height: '20%', backgroundColor: 'white' }}>
                <h1>Sign-Up</h1>
                </div>
            <div style={{padding: 10, backgroundColor: 'white' }}>
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
                <div style={{ display: 'flex', marginTop: '20%', width: "90%", height: 10 }}>
                    <TextField
                        variant="outlined"
                        onChange={onChangeUserName}
                        value={username}
                        style={{ width: "100%" }}
                        label={"Enter Your Username"}
                    />
                    </div>
                <div style={{ display: 'flex', marginTop: '20%', width: "90%", height: 10 }}>
                    <TextField
                        variant="outlined"
                        onChange={onChangeEmail}
                        value={email}
                        style={{ width: "100%" }}
                        label={"Enter Your E-mail"}
                    />
                </div>
                <div style={{ display: 'flex', marginTop: '20%', width: "90%", height: 10 }}>
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
                <div style={{ display: 'flex', marginTop: '20%', width: "90%", height: 10 }}>
                    <TextField
                        variant="outlined"
                        onChange={onChangeRePassword}
                        value={repassword}
                        style={{ width: "100%" }}
                        label={"Re-enter The Password"}
                    />
                </div>
                <div style={{ display: 'flex', marginTop: '20%' ,marginLeft: '33%'}}>
                    <Button onClick={passCheck} variant="outlined">
                        Sign-up
                    </Button>
                </div>
                </div>

            </div>
            
        </div>
    )
};
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HeaderComponent } from "../components/header-component"
import { contactUsService } from "../services/";

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
export const ContactUsPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [helpMessage, setHelpMessage] = useState("");

    const onChangeFirstName = (text) => {
        setFirstName(text.target.value)
    }
    const onChangeLastName = (text) => {
        setLastName(text.target.value)
    }
    const onChangeEmail = (text) => {
        setEmail(text.target.value)
    }
    const onChangeHelpMessage = (text) => {
        setHelpMessage(text.target.value)
    }
    const onSubmit = async () => {
        const contactUsData = {
            "FirstName": firstName,
            "LastName": lastName,
            "Email": email,
            "Description": helpMessage
        }
        const contactUsResponse = await contactUsService(contactUsData);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <HeaderComponent showBackButton={true} islogged={false} iscontacted={false} isabout={false} backgroundColor={'blue'} textColor={'white'} />
            <div style={{ display: 'flex', flexDirection: 'row', padding: 120 }}>
                <div style={{ width: '50%', height: '50%', backgroundColor: 'white' }}>
                    <h1 style={{ color: 'blue' }}>Contact us</h1>
                    <h5 >Need to get in touch
                        with us? Either fill out the form with inquire
                        or find Department email you would like to contact below</h5>
                </div>
                <div style={{ backgroundColor: 'white', paddingLeft: "20vh" }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between' }}>
                        <TextField
                            id="first-name"
                            variant="outlined"
                            onChange={onChangeFirstName}
                            value={firstName}
                            style={{ width: "50%", height: 10, paddingRight: "10%" }}
                            label={"First Name"}
                        />
                        <TextField
                            id="last-name"
                            variant="outlined"
                            onChange={onChangeLastName}
                            value={lastName}
                            style={{ width: "50%", height: 10, paddingRight: "10%" }}
                            label={"Last Name"}
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: '20%', width: "90%", height: 10 }}>
                        <TextField
                            id="email"
                            variant="outlined"
                            onChange={onChangeEmail}
                            value={email}
                            style={{ width: "100%" }}
                            label={"Email"}
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: '20%', width: "90%", height: 10 }}>
                        <TextField
                            multiline
                            rows={4}
                            id="message"
                            variant="outlined"
                            onChange={onChangeHelpMessage}
                            value={helpMessage}
                            style={{ width: "100%" }}
                            label={"What can we help you with?"}
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: '35%' }}>
                        <ThemeProvider theme={theme}>
                            <Button onClick={onSubmit} variant="outlined" color="primary" style={{ fontWeight: "bold", borderWidth: 3, borderRadius: 20 }}>
                                Submit
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </div>
    )
};
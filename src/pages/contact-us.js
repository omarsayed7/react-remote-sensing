import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';

export const ContactUsPage = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [helpMessage, setHelpMessage] = useState();

    const onChangeFirstName = (text) => {
        setFirstName(text)
    }
    const onChangeLastName = (text) => {
        setLastName(text)
    }
    const onChangeEmail = (text) => {
        setEmail(text)
    }
    const onChangeHelpMessage = (text) => {
        setHelpMessage(text)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ padding: 200, width: '50%', height: '50%', backgroundColor: 'white' }}>
                <h1>Contact us</h1>
                <h7>Need to get in touch
                    with us? Either fill out the form with inquire
                    or find Department email you would like to contact below</h7>
            </div>
            <div style={{ padding: 200, backgroundColor: 'white' }}>
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
                        variant="outlined"
                        onChange={onChangeHelpMessage}
                        value={helpMessage}
                        style={{ width: "100%" }}
                        label={"What can we help you with?"}
                    />
                </div>
                <div style={{ display: 'flex', marginTop: '35%' }}>
                    <Button>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
};
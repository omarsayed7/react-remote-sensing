import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export const HeaderComponent = (props) => {

    return (
        <div style={{ display: 'flex', backgroundColor: props.backgroundColor, height: '10vh', alignItems: 'center' }}>
            {(props.showBackButton & !props.islogged) ?
                <Button style={{ color: "white" }}
                    startIcon={<ArrowBackIcon fontSize="large" />}
                    href="/home">
                </Button>
                : null}

            <h4 style={{ paddingLeft: '4vh', paddingRight: '100vh', fontWeight: 'bold', color: props.textColor }}>AI Remote Sensing</h4>
            {props.islogged ?
                <div>
                    <Button href="./home" style={{ fontWeight: 'bold', color: props.textColor }}>
                        Home
                    </Button>
                </div> : null}
            {props.isabout ?
                <div style={{ padding: 5 }}>
                    <Button style={{ fontWeight: 'bold', color: props.textColor }}>
                        About
                    </Button>
                </div> : null}
            {props.iscontacted ? <div style={{ marginRight: 10 }}>
                <Button href="./contact-us" style={{ fontWeight: 'bold', color: props.textColor }}>
                    Contact
                </Button>
            </div> : null}
        </div>
    )
};
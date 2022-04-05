import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

export const HeaderComponent = (props) => {

    return (
        <div style={{ display: 'flex', backgroundColor: props.backgroundColor, height: '10vh', alignItems: 'center' }}>
            <h4 style={{ paddingLeft: '4vh',paddingRight: '100vh', fontWeight: 'bold', color: props.textColor }}>AI Remote Sensing</h4>
            {props.islogged ?
                <div>
                    <Button href ="./home" style={{ fontWeight: 'bold', color: props.textColor }}>
                        Home
                    </Button>
                </div> : null}
            <div style={{padding: 5}}>
                <Button style={{ fontWeight: 'bold', color: props.textColor }}>
                    About
                </Button>
            </div>
            <div style={{marginRight: 10}}>
                <Button href ="./contact-us" style={{ fontWeight: 'bold', color: props.textColor }}>
                    Contact
                </Button>
            </div>
        </div>
    )
};
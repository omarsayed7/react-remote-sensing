import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';

export const HeaderComponent = (props) => {

    return (
        <div style={{ display: 'flex', backgroundColor: props.backgroundColor, height: '10vh', alignItems: 'center' }}>
            <h4 style={{ paddingLeft: '4vh', fontWeight: 'bold', color: props.textColor }}>AI Remote Sensing</h4>
            {props.islogged ?
                <div style={{ paddingLeft: '100vh' }}>
                    <Button style={{ fontWeight: 'bold', color: props.textColor }}>
                        Home
                    </Button>
                </div> : null}
            <div style={{ paddingLeft: '5vh' }}>
                <Button style={{ fontWeight: 'bold', color: props.textColor }}>
                    About
                </Button>
            </div>
            <div style={{ paddingLeft: '5vh' }}>
                <Button style={{ fontWeight: 'bold', color: props.textColor }}>
                    Contact
                </Button>
            </div>
        </div>
    )
};
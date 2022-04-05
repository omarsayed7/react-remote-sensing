import React, { useEffect, useState } from "react";
import background from "../assets/background.jpg";
import { HeaderComponent } from "../components/header-component"
export const LandingPage = () => {

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            height: '100vh'
        }}>
            <HeaderComponent islogged={true} />
        </div>
    )
};
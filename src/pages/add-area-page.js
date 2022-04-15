import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { DrawMapComponent, HeaderComponent } from "../components"
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom'
import TextField from "@material-ui/core/TextField";


export const AddAreaPage = () => {
    const [bbox, setbbox] = useState();
    const [Lat, setLat] = useState("");
    const [Lang, setLang] = useState("");
    const [position, setPosition] = useState([0, 0]);
    const [showMarker, setShowMarker] = useState(false)
    useEffect(() => {
        localStorage.setItem("selectedType", "addArea")
    }, [])
    const handleBbox = (event) => {
        console.log("handlebbox", event)
        setbbox(event);
        console.log(typeof (event), "testttt")
        localStorage.setItem("Bbox", JSON.stringify(event));
        console.log(localStorage.getItem('Bbox'))
    };
    const onSearch = () => {
        const newLat = parseFloat(Lat)
        const newLang = parseFloat(Lang)
        if (newLat && newLang && newLat >= -90 && newLat <= 90 && newLang >= -180 && newLang <= 180) {
            setShowMarker(true)
            setLat(newLat.toString())
            setLang(newLang.toString())
            setPosition([newLat, newLang])
            console.log("a number", position)
        }
        else {
            alert("not a valid number")
        }
    }
    if (!localStorage.getItem('isLogged')) {
        return <Navigate to={"/"} />
    }
    return (
        <div style={{ width: '100%', flexDirection: "column", display: "flex" }}>
            <HeaderComponent islogged={false} backgroundColor={'blue'} iscontacted={true} isabout={true} textColor={'white'} />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: 16 }}>

                <Link to='/home' state={{ Bbbox: bbox }} style={{ alignItems: "center", marginLeft: 20, alignSelf: "center" }}>
                    <Button variant="contained" size="large">
                        Save
                    </Button>
                </Link>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <TextField
                        //variant="outlined"
                        onChange={(text) => {
                            const re = /^[0-9-.]+$/;
                            if (text.target.value === '' || re.test(text.target.value)) {
                                setLat(text.target.value)
                            }
                        }}
                        value={Lat}
                        style={{ width: "25%", marginRight: 16 }}
                        label={"Latitude"}
                        id="latitiude"
                        size="small"

                    />
                    <TextField
                        //variant="outlined"
                        onChange={(text) => {
                            const re = /^[0-9-.]+$/;
                            if (text.target.value === '' || re.test(text.target.value)) {
                                setLang(text.target.value)
                            }
                        }}
                        value={Lang}
                        style={{ width: "25%", marginRight: 16 }}
                        label={"Langitude"}
                        id="langitude"
                        size="small"
                    />
                    <Button variant="outlined" onClick={onSearch} size="small" >
                        Search
                    </Button>
                </div>
            </div>
            <DrawMapComponent
                handleBbox={handleBbox}
                position={position}
                showMarker={showMarker}
            />

        </div>
    )
} 

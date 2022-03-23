import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactTooltip from "react-tooltip";
import { MdInfo } from "@react-icons/all-files/md/MdInfo"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { segmentation, Upload, upload_Segmentation } from '../services'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export const HomePage = (props) => {
    let bbox = localStorage.getItem('Bbox')
    //Handling Modal View
    const [open, setOpen] = useState(false);
    const [modalTitle, setmodalTitle] = useState('')
    const [modalDescription, setmodalDescription] = useState('')

    const handleOpen = (title, description) => {
        setmodalTitle(title)
        setmodalDescription(description)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    // Handling Classification Object
    const [aiModel, setAiModel] = useState('');
    const [postProcessing, setPostProssesing] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setFileName] = useState()
    const [segResponse, setSegResponse] = useState('')
    const [percentage, setPercentage] = useState(0);
    const [startProgress, setStartProgress] = useState(false);

    useEffect(() => {
        let interval = null;
        if (startProgress) {
            interval = setInterval(() => {
                setPercentage(percentage => percentage + 1);
            }, 1000);
        } else if (!startProgress && percentage !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [startProgress, percentage]);

    const handleChangeAiModel = (event) => {
        setAiModel(event.target.value);
    };
    const handleChangePostProcessing = (event) => {
        setPostProssesing(event.target.value);
    };
    const handleClearSelection = (event) => {
        setPostProssesing('');
        setAiModel('');
    };

    const onSegmentation = async () => {
        setSegResponse('')
        setStartProgress(true)
        setPercentage(0)
        const newHeight = localStorage.getItem("height")
        const segUploadModel = {
            "Algorithm": aiModel,
            "PostProcessing": postProcessing
        }
        const segModel = {
            "Bbox": bbox,
            "Width": parseInt(newHeight),
            "Height": 400,
            "Algorithm": aiModel,
            "PostProcessing": postProcessing
        }
        const selectedType = await localStorage.getItem("selectedType")
        if (selectedType == "addArea") {
            const segmentationResponse = await segmentation(segModel);
            setSegResponse(segmentationResponse.message)
            setPercentage(100)
            //After finishing the segmentation clear the inputs again.
            setSelectedFile(null);
            setFileName()
            setPostProssesing('');
            setAiModel('');
        }
        else if (selectedType == "upload") {
            const uploadSegmentationResponse = await upload_Segmentation(segUploadModel);
            setSegResponse(uploadSegmentationResponse.message)
            setPercentage(100)
            //After finishing the segmentation clear the inputs again.
            setSelectedFile(null);
            setFileName()
            setPostProssesing('');
            setAiModel('');
        }
    }

    const onFileUpload = async (event) => {
        var file = event.target.files[0];
        setFileName(event.target.files[0].name)
        setSelectedFile(event.target.files[0])
        localStorage.setItem("selectedType", "upload")
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            file,
            file.name
        );

        const uploadedFile = await Upload(formData)
        var x = JSON.stringify(uploadedFile[1]["bbox"]);
        var boundings = "[" + (x.replaceAll('[', "").replaceAll(']', "").replaceAll('\"', "")) + "]";
        localStorage.setItem("Bbox", boundings)
    };
    return (
        <Grid container spacing={8} padding={10}>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={ModalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modalTitle}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {modalDescription}
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <Grid item xs={6} md={3} sx={{ flex: 1, flexDirection: "column", display: "flex" }}>
                <Item style={{ marginBottom: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <p>1. Data Source</p>
                    <Button onClick={() => handleOpen("Hello", "From DataSource")} style={{ color: "grey" }}>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="DataSource" />
                    </Button>
                </Item>
                {/* <MdInfo data-tip data-for="DataSource" /> */}
                <ReactTooltip id="DataSource" place="top" effect="solid">
                    Choose one option for the Data source type.
                </ReactTooltip>
                <p style={{ marginBottom: 1, fontWeight: "bold", paddingTop: 10 }}>Add Area From Map</p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Link to='/add-area'>
                        <Button variant="outlined"
                            startIcon={<AddCircleIcon />} >
                            Add Area
                        </Button>
                    </Link>
                    <MdInfo style={{ padding: 5, paddingLeft: 5 }} size={20} data-tip data-for="AddArea" />
                    <ReactTooltip id="AddArea" place="top" effect="solid">For viewing Leaflet Map view</ReactTooltip>
                </div>
                <div >
                    <p style={{ marginBottom: 1, fontWeight: "bold" }}>Upload .TIF File</p>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <input style={{ marginTop: 10, display: 'none' }} accept="image/*" id="contained-button-file" type="file" onChange={onFileUpload} />
                        <label htmlFor="contained-button-file">
                            <Button variant="outlined" component="span"
                                startIcon={<AddCircleIcon />}>
                                Upload
                            </Button>
                        </label>
                        <p style={{ marginLeft: 5, fontSize: 10 }}>{fileName}</p>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="Upload" />
                        <ReactTooltip id="Upload" place="top" effect="solid">Upload your (.TIF) file extension</ReactTooltip>
                    </div>
                </div>
                <div>
                    <p style={{ marginBottom: -5 }}> To download more TIF files</p>
                    <div style={{ display: "flex", flexDirection: "row", alignContent: "center" }}>
                        <a href="https://earthexplorer.usgs.gov/" target="_blank">Click here</a>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="TIFFiles" />
                        <ReactTooltip id="TIFFiles" place="top" effect="solid">Redirection for USGS.com</ReactTooltip>
                    </div>
                    <p style={{ marginBottom: -5 }}> OpenstreetMaps</p>
                    <div style={{ display: "flex", flexDirection: "row", alignContent: "center" }}>
                        <a href="https://www.openstreetmap.org/#map=6/31.413/31.802" target="_blank">Click here</a>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="Openstreetmaps" />
                        <ReactTooltip id="Openstreetmaps" place="top" effect="solid">Redirection for OpenStreetMaps.com</ReactTooltip>
                    </div>
                </div>
            </Grid>
            <Grid item xs={6} md={3}>
                <Item style={{ marginBottom: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <p>2. AI Model</p>
                    <Button onClick={() => handleOpen("Hello", "From AI Model")} style={{ color: "grey" }}>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="AIModel" />
                    </Button>
                </Item>
                {/* <Item  > <MdInfo style={{ marginBottom: -5 }} size={20} data-tip data-for="AIModel" /></Item> */}
                <ReactTooltip id="AIModel" place="top" effect="solid">Choose AI model classification type</ReactTooltip>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={aiModel}
                    onChange={handleChangeAiModel}
                    style={{ marginTop: 8 }}
                >
                    <FormControlLabel value="SVM" control={<Radio />} label="Support Vector Machine" />
                    <FormControlLabel value="RF" control={<Radio />} label="Random Forest" />
                    <FormControlLabel value="DT" control={<Radio />} label="Decision Tree" />
                    <FormControlLabel value="CNN" control={<Radio />} label="CNN" />

                </RadioGroup>
            </Grid>
            <Grid item xs={6} md={3}>
                <Item style={{ marginBottom: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <p>3. Post-processing</p>
                    <Button onClick={() => handleOpen("Hello", "From Post Processing")} style={{ color: "grey" }}>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="PostProcessing" />
                    </Button>
                </Item>
                {/* <Item  > <MdInfo style={{ marginBottom: -5 }} size={20} data-tip data-for="PostProcessing" /></Item> */}
                <ReactTooltip id="PostProcessing" place="top" effect="solid">Choose post-processing type, Download the thematic layer on your device OR Show the classified image on the map</ReactTooltip>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={postProcessing}
                    onChange={handleChangePostProcessing}
                    style={{ marginTop: 8 }}
                >
                    <FormControlLabel value="Download" control={<Radio />} label="Download Thematic layer" />
                    <FormControlLabel value="ShowOnMap" control={<Radio />} label="Show on map" />

                </RadioGroup>
            </Grid>
            <Grid item xs={6} md={3}>
                <Item style={{ marginBottom: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <p>4. Run Project</p>
                    <Button onClick={() => handleOpen("Hello", "From Run Project")} style={{ color: "grey" }}>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="RunProject" />
                    </Button>
                </Item>
                <ReactTooltip id="RunProject" place="top" effect="solid">
                    Run Processing to run the AI model OR Choose Thematic overlay for showing the map
                </ReactTooltip>
                {aiModel != '' && postProcessing != '' && !!bbox ?
                    <Button variant="outlined"
                        onClick={onSegmentation}>
                        Run processing
                    </Button>
                    : null}
                <div style={{ paddingTop: 10 }}>
                    <Button
                        variant="outlined"
                        startIcon={<RemoveCircleOutlineIcon />}
                        onClick={handleClearSelection}>
                        Clear selection
                    </Button>
                </div>
            </Grid>
            <Grid item xs={6} md={3}>
                <Item style={{ marginBottom: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <p>5. Processing history</p>
                    <Button onClick={() => handleOpen("Hello", "From Run Project")} style={{ color: "grey" }}>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="RunProject" />
                    </Button>
                </Item>
                {startProgress ?
                    <div style={{ paddingTop: 8 }}>
                        <ProgressBar now={percentage} />
                        <Typography>
                            AI works
                        </Typography>
                    </div>
                    :
                    null}
                {segResponse === "Created!" ?
                    <div style={{ paddingTop: 10 }}>
                        <Typography>
                            Thematic Layer
                        </Typography>
                        <Link to='/map-overlay'>
                            <Button variant="outlined">
                                Thematic overlay
                            </Button>
                        </Link>
                    </div>
                    :
                    null}
            </Grid>
            <a style={{ position: 'absolute', bottom: 20, right: 20, fontWeight: 'bold' }} href="./contact-us">Contact Us</a>
        </Grid>

    );
};
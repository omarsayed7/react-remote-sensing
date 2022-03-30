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
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Dropdown } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { segmentation, Upload, upload_Segmentation, fetchSegmentationMask,fetchUploadSegmentationMask, fetchArchiveImage, Archive } from '../services'

//const data_tooltip = "Leaflet is an open source JavaScript library used to build web mapping applications. First released in 2011, it supports most mobile and desktop platforms, supporting HTML5 and CSS3. /n Leaflet allows developers without a GIS background to very easily display tiled web maps hosted on a public server, with optional tiled overlays. /n It can load feature data from GeoJSON files, style it and create interactive layers, such as markers with popups when clicked./n It is developed by Vladimir Agafonkin, who joined Mapbox in 2013./n Feature:/n Leaflet supports Web Map Service (WMS) layers, GeoJSON layers, Vector layers and Tile layers natively. Many other types of layers are supported via plugins./n /nLike other web map libraries, the basic display model implemented by Leaflet is one basemap, plus zero or more translucent overlays, with zero or more vector objects displayed on top./nElements:/n The major Leaflet object types are:/n /n Raster types (TileLayer and ImageOverlay)/n Vector types (Path, Polygon, and specific types such as rectangle)/n Grouped types (LayerGroup, FeatureGroup and GeoJSON) /n Controls (Zoom, Layers, etc.)"
const data_tooltip = `Leaflet is an open source JavaScript library used to build web mapping applications. First released in 2011, it supports most mobile and desktop platforms, supporting HTML5 and CSS3.\n\t
\n\t
Leaflet allows developers without a GIS background to very easily display tiled web maps hosted on a public server, with optional tiled overlays. \n\t
It can load feature data from GeoJSON files, style it and create interactive layers, such as markers with popups when clicked.\n\t
\n\t
It is developed by Vladimir Agafonkin, who joined Mapbox in 2013.\n\t
\n\t
\n\t
\n\tFeature:
Leaflet supports Web Map Service (WMS) layers, GeoJSON layers, Vector layers and Tile layers natively. Many other types of layers are supported via plugins.\n\t
\n\t
Like other web map libraries, the basic display model implemented by Leaflet is one basemap, plus zero or more translucent overlays, with zero or more vector objects displayed on top.\n\t
\n\t
\n\t
Elements:\n\t
The major Leaflet object types are:\n\t
\n\t
Raster types (TileLayer and ImageOverlay)\n\t
Vector types (Path, Polygon, and specific types such as rectangle) \n\t
Grouped types (LayerGroup, FeatureGroup and GeoJSON) \n\t
Controls (Zoom, Layers, etc.)`
const aimodel_tooltip = `AI models (machine learning and deep learning) help automate logical inference and decision-making in business intelligence.
This methodology helps make analytics smarter and faster, with the ability to scale alongside ever-increasing amounts of data.

Following data collection and data preparation, the third phase in the data pipeline involves the creation of intelligent machine learning models to support
advanced analytics. These models use various types of algorithms, such as linear or logistic regression, to recognize patterns in the data and draw conclusions
in a manner that emulates human expertise. 
Simply put, AI modeling is the creation of a decision-making process that follows three basic steps:

Modeling: 
The first step is to create an AI model, which uses a complex algorithm or layers of algorithms that interpret data and make decisions based on that data.
A successful AI model can act as a surrogate for human expertise in any given use case.

AI model training:
The second step is to train the AI model.Most often, training involves processing large amounts of data through the AI model in iterative test loops and 
checking the results to ensure accuracy,and that the model is behaving as expected and desired.
Engineers are on hand during this process to modify and improve the AI model as it learns.


Inference:
The third step is known as inference. This step refers to the deployment of the AI model into its real-world use case, where the AI model routinely infers
logical conclusions based on available data.


WE ARE USING FOUR TYPES OF MODELS:
1- Support Vector Machine (SVM)
2- Decision Tree (DT)
3- Random Forest (RF)
4- Unet
`
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
    width: 800,
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
    const [year, setYear] = useState('');
    const [archiveImage, setarchiveImage] = useState('');
    const [postProcessing, setPostProssesing] = useState('')
    const [currentPostProcessing, setcurrentPostProssesing] = useState('')
    const [imgUrl, setImgUrl] = useState('')
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
    const handleDropDownChange = (event) => {
        setYear(event.target.value)
        localStorage.setItem('selectedType',"archive")
        localStorage.setItem('selectedYear',event.target.value)
        console.log(localStorage.getItem("selectedType"))
    }
    
    const handleClearSelection = (event) => {
        setPostProssesing('');
        setAiModel('');
        setYear('');
    };

    const onSegmentation = async () => {
        setSegResponse('')
        setStartProgress(true)
        setPercentage(0)
        const newHeight = localStorage.getItem("height")
        const newWidth = localStorage.getItem("width")
        if (newHeight > 1280 || newWidth > 1280) {
            newHeight = newHeight / 10
            newWidth = newWidth / 10
        }
        console.log(newHeight, "newHeight")
        console.log(newWidth, "newWidth")
        const segUploadModel = {
            "Algorithm": aiModel,
            "PostProcessing": postProcessing
            
        }
        const segModel = {
            "Bbox": bbox,
            "Width": parseInt(newWidth),
            "Height": parseInt(newHeight),
            "Algorithm": aiModel,
            "PostProcessing": postProcessing
        }
        const archive = {
            "Year": year,
            "Algorithm": aiModel,
        }
        const selectedType = await localStorage.getItem("selectedType")
        //localStorage.setItem("selectedType", "upload")

        if (selectedType == "addArea") {
            const segmentationResponse = await segmentation(segModel);
            setSegResponse(segmentationResponse.message)
            setcurrentPostProssesing(postProcessing)
            setPercentage(100)
            const segmentationMask = await fetchSegmentationMask();
            setImgUrl(segmentationMask.request.responseURL)
            console.log(segmentationMask,"5165184165165")
            //After finishing the segmentation clear the inputs again.
            setSelectedFile(null);
            setFileName()
            setPostProssesing('');
            setAiModel('');
        }
        else if (selectedType == "upload") {
            const uploadSegmentationResponse = await upload_Segmentation(segUploadModel);
            setSegResponse(uploadSegmentationResponse.message)
            setcurrentPostProssesing(postProcessing)
            setPercentage(100)
            const segmentationMask = await fetchUploadSegmentationMask();
            setImgUrl(segmentationMask.request.responseURL)
            console.log(segmentationMask,"5165184165165")
            //After finishing the segmentation clear the inputs again.
            setSelectedFile(null);
            setFileName()
            setPostProssesing('');
            setAiModel('');
        }
        else if (selectedType == "archive") {
            const archiveResponse = await Archive(archive);
            console.log(archiveResponse,"46546")
            setSegResponse(archiveResponse[0].message)
            console.log(archiveResponse[0].message,"3156465165")
            var y = JSON.stringify(archiveResponse[2]["bbox"]);
            var col_matrix = JSON.stringify(archiveResponse[1]["col_matrix"]);
            var boundings = "[" + (y.replaceAll('[', "").replaceAll(']', "").replaceAll('\"', "")) + "]";
            localStorage.setItem("Bbox", boundings)
            localStorage.setItem("Col_Matrix", col_matrix)
            setcurrentPostProssesing("ShowOnMap")
            setPercentage(100)
            const archiveMask = await fetchArchiveImage();
            setImgUrl(archiveMask.request.responseURL)
            console.log(archiveMask,"51111111165")
            // //After finishing the segmentation clear the inputs again.
            setPostProssesing('');
            setAiModel('');
            setYear('');
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
                          { `heloooomsdsn
                           ksdfksf,sdvkl
                           sdkvskvks
                           
                           cclksndjvnsjkv`}
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <Grid item xs={6} md={3} sx={{ flex: 1, flexDirection: "column", display: "flex" }}>
                <Item style={{ marginBottom: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <p>1. Data Source</p>
                    <Button onClick={() => handleOpen("Data Source", data_tooltip)} style={{ color: "grey" }}>
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
                <p style={{ marginLeft: 5, fontSize: 10 }}></p>
                <FormControl fullWidth>
                <InputLabel id="drop-down-menu">Select Classification Year</InputLabel>
                    <Select
                        labelId="drop-down-menu"
                        defaultValue=""
                        id="drop-down-select"
                        label="Year"
                        onChange={handleDropDownChange}
                    >
                        <MenuItem value={'2015'}>2015</MenuItem>
                        <MenuItem value={'2016'}>2016</MenuItem>
                        <MenuItem value={'2019'}>2019</MenuItem>
                        <MenuItem value={'2021'}>2021</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <div style={{ paddingTop: '5%' }}>
                    <p style={{ marginBottom: -5 }}> USGS for download free images</p>
                    <div style={{ display: "flex", flexDirection: "row", alignContent: "center" }}>
                        <a href="https://earthexplorer.usgs.gov/" target="_blank">Click here</a>
                        <MdInfo style={{ padding: 5 }} size={20} data-tip data-for="TIFFiles" />
                        <ReactTooltip id="TIFFiles" place="top" effect="solid">Opensource website to download free sattelite image</ReactTooltip>
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
                    <Button onClick={() => handleOpen("AI Models", aimodel_tooltip)} style={{ color: "grey" }}>
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
                    {aiModel != '' && year != '' ?
                    <Button variant="outlined"
                        onClick={onSegmentation}>
                        Show archived
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
                            Thematic layer is being generated.....
                        </Typography>
                    </div>
                    :
                    null}
                {segResponse === "Created!" && currentPostProcessing === 'ShowOnMap'?
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
                    {segResponse === "Created!" && currentPostProcessing === "Download" ?
                    <div style={{ paddingTop: 10 }}>
                        <Typography>
                            Thematic Layer
                        </Typography>
                        <Link to='/map-overlay'>
                            <Button variant="outlined">
                                Download Thematic overlay
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
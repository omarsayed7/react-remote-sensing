import React, { useEffect, useState, useParams } from "react";
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

import { segmentation, Upload, upload_Segmentation, fetchSegmentationBoundingMask } from '../services'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export const HomePage = (props) => {
    let bbox = localStorage.getItem('Bbox')
    const [aiModel, setAiModel] = useState('');
    const [postProcessing, setPostProssesing] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    // const [selectedType, setSelectedType] = useState(0)
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
        const segModel = {
            "Bbox": bbox,
            "Width": 400,
            "Height": 400,
            "Algorithm": aiModel,
            "PostProcessing": postProcessing
        }
        console.log("MODEL", segModel)
        const selectedType = await localStorage.getItem("selectedType")
        if (selectedType == "addArea") {
            const segmentationResponse = await segmentation(segModel);
            console.log(segmentationResponse, "segmentationResponse")

        }
        else if (selectedType == "upload") {
            const uploadSegmentationResponse = await upload_Segmentation(segModel);
            console.log(uploadSegmentationResponse, "uploadSegmentationResponse")
            localStorage.setItem("Bbox", JSON.stringify(uploadSegmentationResponse[1]["bbox"]))
            // const boundingBox = await fetchSegmentationBoundingMask();
        }
        else {
            console.log("Please select Data source")
        }
    }
    const onUploadFile = (event) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0])
        console.log(selectedFile);
    }
    const onFileUpload = async () => {
        localStorage.setItem("selectedType", "upload")
        // setSelectedType(2)
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        console.log(selectedFile, '666666666666666666');
        console.log(formData, '98451542154')

        const uploadedFile = await Upload(formData)
    };
    return (
        <Grid container spacing={8} padding={10}>
            <Grid item xs={6} md={3} sx={{ flex: 1, flexDirection: "column", display: "flex" }}>
                <Item data-tip data-for="DataSource" style={{ marginBottom: 10 }}>1. Data Source</Item>
                <ReactTooltip id="DataSource" place="top" effect="solid">Textttt</ReactTooltip>
                <Link to='/add-area'>
                    <Button variant="outlined"
                        startIcon={<AddCircleIcon />} >
                        Add Area
                    </Button>
                </Link>
                <div>
                    <input style={{ marginTop: 10 }} accept="image/*" id="contained-button-file" type="file" onChange={onUploadFile} />
                    <Button onClick={onFileUpload}>
                        Upload
                    </Button>
                </div>
                <div>
                    <p style={{ marginBottom: -5 }}> To download more TIF files</p>
                    <a href="https://earthexplorer.usgs.gov/" target="_blank">Click here</a>
                </div>
            </Grid>
            <Grid item xs={6} md={3}>
                <Item data-tip data-for="AIModel" >2. AI Model</Item>
                <ReactTooltip id="AIModel" place="top" effect="solid">Textttt</ReactTooltip>
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
                <Item data-tip data-for="PostProcessing" >3. Post-processing</Item>
                <ReactTooltip id="PostProcessing" place="top" effect="solid">Textttt</ReactTooltip>
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
                <Item data-tip data-for="RunProject" style={{ marginBottom: 10 }}>4. Run Project</Item>
                <ReactTooltip id="RunProject" place="top" effect="solid">Textttt</ReactTooltip>
                <Link to='/map-overlay'>
                    <Button variant="outlined">
                        Thematic overlay
                    </Button>
                </Link>
                {aiModel != '' && postProcessing != '' && !!bbox ?
                    <Button variant="outlined"
                        onClick={onSegmentation}>
                        Run processing
                    </Button>
                    : null}
                <Button variant="outlined"
                    startIcon={<RemoveCircleOutlineIcon />}
                    onClick={handleClearSelection}>
                    Clear selection
                </Button>
            </Grid>
        </Grid >
    );
};
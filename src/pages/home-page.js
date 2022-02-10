import React, { useEffect, useState} from "react";
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
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useLocation } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const HomePage = (props) => {
    const location = useLocation()
    console.log(location,'dmgkfjgklfjgklf')

    const [aiModel, setAiModel] = useState('');
    const [postProcessing, setPostProssesing] = useState('')
    const [area, setArea] = useState('')
    const handleChangeArea = (event) => {
        setArea(event.target.value);
      };
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
    return (
        <Grid container spacing={8} padding={10} marginLeft={7}>
            
            <Grid item xs={6} md={3}>
                <Item style ={{marginBottom:10}}>1. Data Source</Item>
                <Link to='/add-area'>
                <Button variant="outlined"
                startIcon={<AddCircleIcon/>} >
                Add Area
                </Button>
                </Link>
            </Grid>
            <Grid item xs={6} md={3}>
                <Item>2. AI Model</Item>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={aiModel}
                onChange={handleChangeAiModel}
                style ={{marginTop:8}}
                >
                    <FormControlLabel value="Support Vector Machine" control={<Radio />} label="Support Vector Machine" />
                    <FormControlLabel value="Random Forest" control={<Radio />} label="Random Forest" />
                    <FormControlLabel value="Decision Tree" control={<Radio />} label="Decision Tree" />
                    <FormControlLabel value="CNN" control={<Radio />} label="CNN" />

                </RadioGroup>
            </Grid>
            <Grid item xs={6} md={3}>
                <Item>3. Post-processing</Item>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={postProcessing}
                onChange={handleChangePostProcessing}
                style ={{marginTop:8}}
                >
                    <FormControlLabel value="Download" control={<Radio />} label="Download Mask" />
                    <FormControlLabel value="ShowOnMap" control={<Radio />} label="Show on map" />

                </RadioGroup>
            </Grid>
            <Grid item xs={6} md={3}>
                <Item style ={{marginBottom:10}}>4. Run Project</Item>
                <Button variant="outlined"
                startIcon={<RemoveCircleOutlineIcon/>} 
                onClick={handleClearSelection}>
                    Clear selection
                </Button>
            </Grid>
        </Grid>
    );
};

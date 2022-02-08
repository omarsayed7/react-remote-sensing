import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const HomePage = () => {
    console.log("here")
    return (
        <Grid container spacing={4}>
            <Grid item xs={6} md={2}>
                <Item>1. Data Source</Item>
            </Grid>
            <Grid item xs={6} md={2}>
                <Item>2. AI Model</Item>
            </Grid>
            <Grid item xs={6} md={2}>
                <Item>3. Post-processing</Item>
            </Grid>
        </Grid>
    );
};

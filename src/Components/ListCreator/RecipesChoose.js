import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';

const RecipesChoose = ({ recipes }) => {
    const Receip = ({ title, image, id }) => {
        return (
            <Card sx={{ width: 345, height: 330 }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image={image}
                    title="green iguana"
                />
                <CardContent style={{ height: 60 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button size="small">Details</Button>
                </CardActions>
            </Card>
        );
    };

    return (
        <Box padding="5% 20% 0">
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {recipes.map(({ title, image, id }) => {
                    return (
                        <Grid item key={id}>
                            <Receip title={title} image={image} id={id} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default RecipesChoose;

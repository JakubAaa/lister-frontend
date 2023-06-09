import React, { useEffect, useState } from 'react';
import {
    Grid,
    Box,
    Alert,
    CircularProgress,
    Typography,
    Pagination,
    Button,
    CardMedia,
    CardContent,
    CardActions,
    Card,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { courseTypes, dietTypes, cuisineTypes } from './recipeOptions';
import { appConfig } from '../../config';
import { UseRecipeState } from '../../context/recipeContext';

const RecipeChoose = ({ type, page }) => {
    const recipeOptions = UseRecipeState();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const mapParams = {
            course: 'course_type',
            dietType: 'diet_type',
            cuisine: 'cuisine',
            maxReadyTime: 'max_ready_time',
            description: 'description',
        };

        const convertParamToUrl = (param, value) => {
            if (param === 'description' || param === 'maxReadyTime')
                return value;
            if (param === 'course') return courseTypes[value];
            if (param === 'dietType') return dietTypes[value];
            if (param === 'cuisine') return cuisineTypes[value];
        };

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let url =
            type === 'normal'
                ? `${appConfig.BACKEND_URL}/recipe?page=${page}&page_size=8`
                : `${appConfig.BACKEND_URL}/recipe/random?page=${page}&page_size=8`;
        if (type === 'normal') {
            for (let param in recipeOptions) {
                if (recipeOptions[param]) {
                    const valueToUrl = convertParamToUrl(
                        param,
                        recipeOptions[param]
                    );
                    url += `&${mapParams[param]}=${valueToUrl}`;
                }
            }
        }

        setLoading(true);
        fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
                setRecipes(res);
                setLoading(false);
            })
            .catch(() => {
                setIsError(true);
                setLoading(false);
            });
    }, [type, page, recipeOptions]);

    const Receip = ({ title, image, id }) => {
        const handleDetailsClick = () => {
            navigate(`/recipe/${id}`);
        };

        return (
            <Card sx={{ width: 345, height: 330 }}>
                <CardMedia
                    sx={{ height: 180 }}
                    image={image}
                    title="green iguana"
                />
                <CardContent style={{ height: 60 }}>
                    <Typography gutterBottom variant="h5">
                        {title}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleDetailsClick} size="small">
                        Details
                    </Button>
                </CardActions>
            </Card>
        );
    };

    return loading ? (
        <Box
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <CircularProgress />
        </Box>
    ) : recipes.length > 0 ? (
        <Box
            sx={{
                marginTop: 8,
            }}
        >
            <Typography
                sx={{
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                    color: blue[500],
                    marginTop: 0,
                }}
                variant="h4"
                gutterBottom
            >
                Choose recipe
            </Typography>
            <Grid
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                spacing={{ xs: 2, md: 8 }}
            >
                {recipes.map(({ title, image, id }) => {
                    return (
                        <Grid item key={id}>
                            <Receip title={title} image={image} id={id} />
                        </Grid>
                    );
                })}
            </Grid>
            <Pagination
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                count={10}
                page={page}
                color="primary"
                onChange={(_, page) => {
                    navigate(`/choose-recipe?page=${page}&type=${type}`);
                }}
            />
        </Box>
    ) : isError ? (
        <Box
            position="absolute"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Alert
                severity="error"
                onClose={() => {
                    setIsError(false);
                    navigate(`/createRecipe`);
                }}
            >
                Something went wrong - <strong>try again</strong>
            </Alert>
        </Box>
    ) : (
        <Box>
            {page > 1 ? (
                <Typography
                    style={{
                        color: blue[600],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    variant="h4"
                >
                    Unfortunately, nothing found...
                </Typography>
            ) : (
                <Typography
                    style={{
                        color: blue[600],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    variant="h4"
                >
                    You're out of luck today, nothing found...
                </Typography>
            )}
            <Pagination
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    bottom: 25,
                    left: 0,
                    width: '100%',
                }}
                count={10}
                page={page}
                color="primary"
                onChange={(_, page) => {
                    navigate(`/choose-recipe?page=${page}&type=${type}`);
                }}
            />
        </Box>
    );
};

export default RecipeChoose;

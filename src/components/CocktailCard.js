import React from 'react';
import PropTypes from 'prop-types';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from '@mui/material';

const CocktailCard = ({ cocktail, manageFavorites, buttonText }) => {
    return (
        <Card
            sx={{
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <CardMedia
                component="img"
                alt={cocktail.strDrink}
                image={cocktail.strDrinkThumb}
                sx={{
                    height: 300, // Original dimensions
                    objectFit: 'cover', // Ensure the image covers the area
                }}
            />
            <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {cocktail.strDrink}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {cocktail.strCategory}
                </Typography>

                {/* Conditionally render the Add to Favorites button if the function is passed */}
                {manageFavorites && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 2, // Margin on top of the button
                            borderRadius: '20px',
                            padding: '5px 20px',
                        }}
                        onClick={() => manageFavorites(cocktail)}
                    >
                        {buttonText}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

CocktailCard.propTypes = {
    cocktail: PropTypes.shape({
        strDrink: PropTypes.string.isRequired,
        strDrinkThumb: PropTypes.string.isRequired,
        strCategory: PropTypes.string,
    }).isRequired,
    manageFavorites: PropTypes.func,
    buttonText: PropTypes.string,
};

export default CocktailCard;

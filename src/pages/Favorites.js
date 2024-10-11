import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@mui/material';
import CocktailCard from '../components/CocktailCard';

const Favorites = ({ favorites, removeFromFavorites }) => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Favorites
            </Typography>
            <Grid container spacing={2}>
                {favorites.map((cocktail) => (
                    <Grid item xs={12} sm={6} md={4} key={cocktail.idDrink}>
                        <CocktailCard
                            cocktail={cocktail}
                            manageFavorites={removeFromFavorites}
                            buttonText="Remove"
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

Favorites.propTypes = {
    favorites: PropTypes.arrayOf(
        PropTypes.shape({
            idDrink: PropTypes.string.isRequired,
            strDrink: PropTypes.string.isRequired,
            strDrinkThumb: PropTypes.string.isRequired,
            strCategory: PropTypes.string,
        })
    ).isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
};

export default Favorites;

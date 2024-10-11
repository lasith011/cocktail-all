import React, { useState } from 'react';
import { TextField, Grid, Box } from '@mui/material';
import ReloadButton from '../components/ReloadButton';
import CocktailCard from '../components/CocktailCard';
import { searchCocktails } from '../services/cocktailApi';
import PropTypes from 'prop-types';

const Search = ({ addToFavorites }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleSearch = async () => {
        const results = await searchCocktails(query, setLoading);
        setSearchResults(results);
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <TextField
                    label="Search for a cocktail"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    sx={{
                        transition: 'width 0.4s ease-in-out',
                        width: focused ? '400px' : '250px',
                        maxWidth: '100%',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: focused
                                    ? '#f50057'
                                    : 'rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover fieldset': {
                                borderColor: '#f50057',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#ff4081',
                            },
                        },
                    }}
                />
                <ReloadButton
                    onClick={handleSearch}
                    loading={loading}
                    buttonText="Search"
                    disabled={loading}
                />
            </Box>
            <Grid container spacing={2}>
                {searchResults.map((cocktail) => (
                    <Grid item xs={12} sm={6} md={4} key={cocktail.idDrink}>
                        <CocktailCard
                            cocktail={cocktail}
                            manageFavorites={addToFavorites}
                            buttonText="Add to Favorites"
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

Search.propTypes = {
    addToFavorites: PropTypes.func,
};
export default Search;

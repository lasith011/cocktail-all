import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Skeleton,
    Snackbar,
    Alert,
} from '@mui/material';
import ReloadButton from '../components/ReloadButton';
import CocktailCard from '../components/CocktailCard';
import { getRandomCocktails } from '../services/cocktailApi';
import PropTypes from 'prop-types';

const Home = ({ addToFavorites }) => {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const fetchRandomCocktails = async () => {
        const randomCocktails = await getRandomCocktails(
            5,
            setLoading,
            setSnackbar
        );
        if (randomCocktails.length > 0) {
            setCocktails(randomCocktails);
        }
    };

    useEffect(() => {
        fetchRandomCocktails();
    }, []);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div>
            <ReloadButton
                onClick={fetchRandomCocktails}
                loading={loading}
                buttonText="Reload"
            />
            <Grid container spacing={2}>
                {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                              <Card
                                  sx={{
                                      borderRadius: 2,
                                      boxShadow:
                                          '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                      transition: 'transform 0.3s ease-in-out',
                                      '&:hover': {
                                          transform: 'scale(1.05)',
                                      },
                                  }}
                              >
                                  <Skeleton
                                      variant="rectangular"
                                      height={300}
                                  />
                                  <CardContent>
                                      <Skeleton variant="text" />
                                      <Skeleton variant="text" width="80%" />
                                  </CardContent>
                              </Card>
                          </Grid>
                      ))
                    : cocktails.map((cocktail) => (
                          <Grid
                              item
                              xs={12}
                              sm={6}
                              md={4}
                              key={cocktail.idDrink}
                          >
                              <CocktailCard
                                  cocktail={cocktail}
                                  onAddToFavorites={addToFavorites}
                              />
                          </Grid>
                      ))}
            </Grid>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

Home.propTypes = {
    addToFavorites: PropTypes.func,
};
export default Home;

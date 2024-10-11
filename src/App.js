import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';

const App = () => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (cocktail) => {
        if (!favorites.some((fav) => fav.idDrink === cocktail.idDrink)) {
            setFavorites((prev) => [...prev, cocktail]);
        }
    };

    const removeFromFavorites = (toRemove) => {
        setFavorites((prev) =>
            prev.filter((cocktail) => cocktail.idDrink !== toRemove.idDrink)
        );
    };

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/search"
                        element={<Search addToFavorites={addToFavorites} />}
                    />
                    <Route
                        path="/favorites"
                        element={
                            <Favorites
                                favorites={favorites}
                                removeFromFavorites={removeFromFavorites}
                            />
                        }
                    />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;

import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { getRandomCocktails } from '../services/cocktailApi';
import { expect, describe, jest, test } from '@jest/globals';

jest.mock('../services/cocktailApi');

describe('Home component', () => {
    const mockCocktails = [
        { idDrink: '1', strDrink: 'Margarita', strDrinkThumb: 'image1.jpg' },
        { idDrink: '2', strDrink: 'Daiquiri', strDrinkThumb: 'image2.jpg' },
    ];

    test('displays loading skeletons when cocktails are being fetched', () => {
        getRandomCocktails.mockResolvedValueOnce([]);
        render(<Home addToFavorites={jest.fn()} />);

        expect(screen.getAllByRole('progressbar').length).toBe(1);
    });

    test('calls getRandomCocktails once on initial render', async () => {
        getRandomCocktails.mockResolvedValueOnce(mockCocktails);
        render(<Home addToFavorites={jest.fn()} />);

        expect(getRandomCocktails).toHaveBeenCalledTimes(1);
    });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from './Search';
import { searchCocktails } from '../services/cocktailApi';
import { expect, describe, jest, test } from '@jest/globals';

// Mock the searchCocktails service
jest.mock('../services/cocktailApi');

describe('Search Component', () => {
    const mockCocktails = [
        { idDrink: '1', strDrink: 'Margarita', strDrinkThumb: 'image1.jpg' },
        { idDrink: '2', strDrink: 'Daiquiri', strDrinkThumb: 'image2.jpg' },
    ];

    test('renders search input and button', () => {
        render(<Search addToFavorites={jest.fn()} />);

        const input = screen.getByLabelText('Search for a cocktail');
        const button = screen.getByText('Search');

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    test('performs a search when the search button is clicked', async () => {
        searchCocktails.mockResolvedValueOnce(mockCocktails);

        render(<Search addToFavorites={jest.fn()} />);

        const input = screen.getByLabelText('Search for a cocktail');
        const button = screen.getByText('Search');

        fireEvent.change(input, { target: { value: 'Margarita' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(searchCocktails).toHaveBeenCalledWith(
                'Margarita',
                expect.any(Function)
            );
            expect(screen.getByText('Margarita')).toBeInTheDocument();
            expect(screen.getByText('Daiquiri')).toBeInTheDocument();
        });
    });

    test('displays a loading spinner while fetching cocktails', async () => {
        searchCocktails.mockResolvedValueOnce([]);

        render(<Search addToFavorites={jest.fn()} />);

        const button = screen.getByText('Search');
        fireEvent.click(button);

        const refreshIcon = await screen.findByTestId('RefreshIcon');
        expect(refreshIcon).toBeInTheDocument();
    });
});

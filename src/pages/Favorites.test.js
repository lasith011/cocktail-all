import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Favorites from '../pages/Favorites';
import { expect, describe, jest, it } from '@jest/globals';

// Mock the searchCocktails service
jest.mock('../services/cocktailApi');

describe('Favorites component', () => {
    const mockFavorites = [
        { idDrink: '1', strDrink: 'Margarita', strDrinkThumb: 'image1.jpg' },
        { idDrink: '2', strDrink: 'Daiquiri', strDrinkThumb: 'image2.jpg' },
    ];

    it('renders favorites list correctly', () => {
        render(
            <Favorites
                favorites={mockFavorites}
                removeFromFavorites={jest.fn()}
            />
        );

        expect(screen.getByText('Favorites')).toBeInTheDocument();
        expect(screen.getByText('Margarita')).toBeInTheDocument();
        expect(screen.getByText('Daiquiri')).toBeInTheDocument();
    });

    it('calls removeFromFavorites when the remove button is clicked', () => {
        const removeFromFavorites = jest.fn();
        render(
            <Favorites
                favorites={mockFavorites}
                removeFromFavorites={removeFromFavorites}
            />
        );

        const removeButtons = screen.getAllByText('Remove');
        fireEvent.click(removeButtons[0]);

        expect(removeFromFavorites).toHaveBeenCalledWith(mockFavorites[0]);
    });

    it('displays no cocktails if favorites list is empty', () => {
        render(<Favorites favorites={[]} removeFromFavorites={jest.fn()} />);

        expect(screen.queryByText('Margarita')).not.toBeInTheDocument();
        expect(screen.queryByText('Martini')).not.toBeInTheDocument();
    });
});

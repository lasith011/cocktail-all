import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CocktailCard from './CocktailCard';
import { expect, describe, jest, it } from '@jest/globals';

describe('CocktailCard', () => {
    const cocktail = {
        strDrink: 'Mojito',
        strDrinkThumb: 'https://example.com/mojito.jpg',
        strCategory: 'Cocktail',
        idDrink: '11000',
    };

    it('renders cocktail information correctly', () => {
        render(<CocktailCard cocktail={cocktail} />);

        expect(screen.getByText(cocktail.strDrink)).toBeInTheDocument();
        const image = screen.getByAltText(cocktail.strDrink);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', cocktail.strDrinkThumb);
        expect(
            screen.getByText(`Category: ${cocktail.strCategory}`)
        ).toBeInTheDocument();
    });

    it('renders the Add to Favorites button when manageFavorites is provided', () => {
        const manageFavorites = jest.fn();

        render(
            <CocktailCard
                cocktail={cocktail}
                manageFavorites={manageFavorites}
                buttonText="Add to Favorites"
            />
        );

        const button = screen.getByRole('button', {
            name: /Add to Favorites/i,
        });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(manageFavorites).toHaveBeenCalledWith(cocktail);
    });

    it('does not render the button when manageFavorites is not provided', () => {
        render(<CocktailCard cocktail={cocktail} />);

        const button = screen.queryByRole('button', {
            name: /Add to Favorites/i,
        });
        expect(button).not.toBeInTheDocument();
    });
});

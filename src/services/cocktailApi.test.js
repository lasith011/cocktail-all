import { searchCocktails, getRandomCocktails } from './cocktailApi';
import { expect, beforeEach, describe, it } from '@jest/globals';

global.fetch = jest.fn();

describe('Cocktail API', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('searchCocktails fetches and returns the correct data', async () => {
        const mockSetLoading = jest.fn();
        const mockResponse = {
            drinks: [{ idDrink: '11000', strDrink: 'Mojito' }],
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await searchCocktails('mojito', mockSetLoading);

        expect(fetch).toHaveBeenCalledWith(
            'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito'
        );
        expect(result).toEqual(mockResponse.drinks);
        expect(mockSetLoading).toHaveBeenCalledWith(true);
        expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    it('getRandomCocktails fetches and returns random cocktails', async () => {
        const mockSetLoading = jest.fn();
        const mockResponse = {
            drinks: [{ idDrink: '11000', strDrink: 'Mojito' }],
        };

        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await getRandomCocktails(3, mockSetLoading);

        expect(fetch).toHaveBeenCalledTimes(3);
        expect(result).toEqual([
            mockResponse.drinks[0],
            mockResponse.drinks[0],
            mockResponse.drinks[0],
        ]);
        expect(mockSetLoading).toHaveBeenCalledWith(true);
        expect(mockSetLoading).toHaveBeenCalledWith(false);
    });
});

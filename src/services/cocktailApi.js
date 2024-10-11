const BASE_URL =
    process.env.REACT_APP_BASE_URL ||
    'https://www.thecocktaildb.com/api/json/v1/1/';

export const searchCocktails = async (query, setLoading, setSnackbar) => {
    try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}search.php?s=${query}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.drinks || [];
    } catch (error) {
        setSnackbar({
            open: true,
            message: 'Error fetching cocktails. Please try again.',
            severity: 'error',
        });
        return [];
    } finally {
        setLoading(false);
    }
};

export const getRandomCocktails = async (x, setLoading, setSnackbar) => {
    try {
        setLoading(true);
        const requests = Array.from({ length: x }, () =>
            fetch(`${BASE_URL}random.php`).then((response) => response.json())
        );
        const results = await Promise.all(requests);
        const drinks = results.map((data) => data.drinks[0]);

        return drinks;
    } catch (error) {
        setSnackbar({
            open: true,
            message: 'Error fetching cocktails. Please try again.',
            severity: 'error',
        });
        return [];
    } finally {
        setLoading(false);
    }
};

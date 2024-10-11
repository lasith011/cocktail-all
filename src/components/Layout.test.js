import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { expect, describe, it, beforeEach, afterEach } from '@jest/globals';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('Layout Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockImplementation(() => mockNavigate);

        render(
            <Layout>
                <div>Test Content</div>
            </Layout>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the AppBar and its components', () => {
        expect(screen.getByText('Cocktail App')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Favorites')).toBeInTheDocument();
    });

    it('navigates to the home route when the Home menu item is clicked', () => {
        fireEvent.click(screen.getByText('Home'));
        expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    it('navigates to the search route when the Search menu item is clicked', () => {
        fireEvent.click(screen.getByText('Search'));
        expect(mockNavigate).toHaveBeenCalledWith('/search');
    });

    it('navigates to the favorites route when the Favorites menu item is clicked', () => {
        fireEvent.click(screen.getByText('Favorites'));
        expect(mockNavigate).toHaveBeenCalledWith('/favorites');
    });

    it('displays children components', () => {
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});

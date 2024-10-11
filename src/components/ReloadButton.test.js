import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReloadButton from './ReloadButton';
import { expect, describe, jest, it } from '@jest/globals';

describe('ReloadButton', () => {
    it('renders button with correct text when not loading', () => {
        render(
            <ReloadButton
                onClick={() => {}}
                loading={false}
                buttonText="Search"
            />
        );

        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('renders CircularProgress when loading', () => {
        render(
            <ReloadButton
                onClick={() => {}}
                loading={true}
                buttonText="Search"
            />
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.queryByText('Search')).not.toBeInTheDocument();
    });

    it('triggers the onClick event when button is clicked', () => {
        const handleClick = jest.fn();
        render(
            <ReloadButton
                onClick={handleClick}
                loading={false}
                buttonText="Search"
            />
        );

        const button = screen.getByText('Search');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

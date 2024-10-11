import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import PropTypes from 'prop-types';

const ReloadButton = ({ onClick, loading, buttonText }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            startIcon={!loading && <RefreshIcon />}
            sx={{
                marginTop: '16px',
                marginLeft: '16px',
                marginBottom: '16px',
                backgroundColor: '#f50057',
                borderColor: '#f50057',
                '&:hover': {
                    backgroundColor: '#ff4081',
                },
                color: 'white',
                textTransform: 'none',
            }}
        >
            {loading ? (
                <CircularProgress size={24} color="inherit" />
            ) : (
                buttonText
            )}
        </Button>
    );
};

ReloadButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default ReloadButton;

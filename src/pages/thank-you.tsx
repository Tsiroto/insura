import { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { BASE_PATH } from '../config/config.ts'; // adjust if needed

export default function ThankYou() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate(BASE_PATH); // Auto-redirect to index after 6s
        }, 6000);
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <Box
            maxWidth="sm"
            mx="auto"
            mt={8}
            textAlign="center"
            px={3}
        >
            <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
                Thank you for your submission!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
                You’ll be redirected shortly. You can also start over below.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(BASE_PATH)}
            >
                Start Over
            </Button>
        </Box>
    );
}

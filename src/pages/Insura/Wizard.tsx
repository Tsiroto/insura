import { Box, Typography, Paper } from '@mui/material';
import WizardTypeSelector from '../../components/WizardTypeSelector';
import { useFormStore } from '../../store/formStore';
import { useEffect } from 'react';


export default function Wizard() {
    const { reset } = useFormStore();
    useEffect(() => {
        reset();
    }, [reset]);
    return (
        <Box
            minHeight="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
        >
            <Paper
                elevation={0}
                sx={{
                    mb: 5,
                    textAlign: 'center',
                    width: '100%',
                    mx: 'auto',
                    p: 4,
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(2px)',
                    border: 0,
                    boxShadow : 'none',
                }}
            >
                <Typography variant="h5" fontWeight={500} color="text.primary" gutterBottom>
                    Welcome to Insura
                </Typography>
                <Typography variant="body1" color="text.secondary" fontSize="1.1rem">
                    Get a personalised quote in just 5 minutes.
                </Typography>
            </Paper>
            <WizardTypeSelector />
        </Box>
    );
}

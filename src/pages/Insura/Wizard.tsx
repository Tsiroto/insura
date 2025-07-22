import { Box, Container, Typography } from '@mui/material';
import WizardTypeSelector from '../../components/WizardTypeSelector';
import { useFormStore } from '../../store/formStore';
import { useEffect } from 'react';


export default function Wizard() {
    const { reset } = useFormStore();
    useEffect(() => {
        reset();
    }, [reset]);
    return (
        <Container maxWidth="md">
            <Box my={5} textAlign="center">
                <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
                    Welcome to Insura
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Choose your insurance category to begin. Our wizard will guide you step-by-step.
                </Typography>
            </Box>
            <WizardTypeSelector />
        </Container>
    );
}

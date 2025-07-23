import {
    TextField,
    Typography,
    Stack,
    Box,
} from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import type {
    UseFormRegister,
    UseFormStateReturn,
} from 'react-hook-form';
import type { FormFields } from '../../types/form';
import { useFormStore } from '../../store/formStore';

interface MotoWizardProps {
    step: number;
    register: UseFormRegister<FormFields>;
    formState: UseFormStateReturn<FormFields>;
}

export default function MotoWizard({
    step,
    register,
    formState,
}: MotoWizardProps) {
    const { data } = useFormStore();

    if (step === 0) {
        return (
            <Stack spacing={2}>
                <TextField
                    label="License Plate"
                    fullWidth
                    autoFocus
                    {...register('licensePlate', { required: 'Required' })}
                    error={!!formState.errors.licensePlate}
                    helperText={formState.errors.licensePlate?.message}
                />
                <TextField
                    label="Registration Year"
                    fullWidth
                    type="number"
                    {...register('registrationYear', {
                        required: 'Required',
                        min: { value: 1980, message: 'Must be after 1979' },
                        max: { value: new Date().getFullYear(), message: `Cannot be after ${new Date().getFullYear()}` },
                    })}
                    error={!!formState.errors.registrationYear}
                    helperText={formState.errors.registrationYear?.message}
                />
            </Stack>
        );
    }

    if (step === 1) {
        return (
            <Stack spacing={2}>
                <TextField
                    label="Owner Name"
                    fullWidth
                    autoFocus
                    {...register('ownerName', { required: 'Required' })}
                    error={!!formState.errors.ownerName}
                    helperText={formState.errors.ownerName?.message}
                />
                <TextField
                    label="Email"
                    fullWidth
                    type="email"
                    {...register('email', {
                        required: 'Required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email',
                        },
                    })}
                    error={!!formState.errors.email}
                    helperText={formState.errors.email?.message}
                />
            </Stack>
        );
    }

    if (step === 2) {
        return (
            <Box mt={5} display="flex" justifyContent="center">
                <Box
                    sx={(theme) => ({
                        width: '100%',
                        maxWidth: 480,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        boxShadow: theme.shadows[1],
                        px: 4,
                        py: 5,
                        textAlign: 'center',
                    })}
                >
                    <TwoWheelerIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom color="primary">
                        You're almost done! Here's a summary:
                    </Typography>
                    <Box mt={3} textAlign="left">
                        <Typography sx={{ mb: 1 }}>
                            <strong>License Plate:</strong> {data.licensePlate}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            <strong>Registration Year:</strong> {data.registrationYear}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            <strong>Owner Name:</strong> {data.ownerName}
                        </Typography>
                        <Typography>
                            <strong>Email:</strong> {data.email}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    return null;
}

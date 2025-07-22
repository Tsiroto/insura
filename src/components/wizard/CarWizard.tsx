import { TextField, Typography, Stack, Box } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form';
import type { FormFields } from '../../types/form';
import { useFormStore } from '../../store/formStore';

const currentYear = new Date().getFullYear();

interface CarWizardProps {
    step: number;
    register: UseFormRegister<FormFields>;
    formState: UseFormStateReturn<FormFields>;
}

export default function CarWizard({
                                      step,
                                      register,
                                      formState,
                                  }: CarWizardProps) {
    const { data } = useFormStore(); // ✅ Hook called unconditionally

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
                        min: { value: 2001, message: 'Must be after 2000' },
                        max: { value: currentYear, message: `Cannot be after ${currentYear}` },
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
                    <DirectionsCarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom color="primary">
                        You're almost done! Here's a summary:
                    </Typography>

                    <Box mt={3} textAlign="left">
                        <Typography sx={{ mb: 1 }}>
                            <Box component="span" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                License Plate:
                            </Box>{' '}
                            <Box component="span" sx={{ color: 'text.primary' }}>
                                {data.licensePlate}
                            </Box>
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            <Box component="span" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Registration Year:
                            </Box>{' '}
                            <Box component="span" sx={{ color: 'text.primary' }}>
                                {data.registrationYear}
                            </Box>
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            <Box component="span" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Owner Name:
                            </Box>{' '}
                            <Box component="span" sx={{ color: 'text.primary' }}>
                                {data.ownerName}
                            </Box>
                        </Typography>
                        <Typography>
                            <Box component="span" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                Email:
                            </Box>{' '}
                            <Box component="span" sx={{ color: 'text.primary' }}>
                                {data.email}
                            </Box>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    return null;
}

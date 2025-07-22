import {
    TextField,
    Typography,
    Stack,
    Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import type {
    UseFormRegister,
    UseFormWatch,
    UseFormStateReturn,
} from 'react-hook-form';
import type { FormFields } from '../../types/form';

interface HomeWizardProps {
    step: number;
    register: UseFormRegister<FormFields>;
    watch: UseFormWatch<FormFields>;
    formState: UseFormStateReturn<FormFields>;
}

export default function HomeWizard({
                                       step,
                                       register,
                                       watch,
                                       formState,
                                   }: HomeWizardProps) {
    if (step === 0) {
        return (
            <Stack spacing={2}>
                <TextField
                    label="Property Type"
                    fullWidth
                    inputRef={(el) => step === 0 && el?.focus()}
                    {...register('propertyType', { required: 'Required' })}
                    error={!!formState.errors.propertyType}
                    helperText={formState.errors.propertyType?.message}
                />
                <TextField
                    label="Square Meters"
                    type="number"
                    fullWidth
                    {...register('squareMeters', {
                        required: 'Required',
                        min: { value: 10, message: 'Too small' },
                    })}
                    error={!!formState.errors.squareMeters}
                    helperText={formState.errors.squareMeters?.message}
                />
            </Stack>
        );
    }

    if (step === 1) {
        return (
            <Stack spacing={2}>
                <TextField
                    label="Coverage Amount (€)"
                    fullWidth
                    type="number"
                    inputRef={(el) => step === 1 && el?.focus()}
                    {...register('coverage', {
                        required: 'Required',
                        min: { value: 1000, message: 'Too low' },
                    })}
                    error={!!formState.errors.coverage}
                    helperText={formState.errors.coverage?.message}
                />
            </Stack>
        );
    }

    if (step === 2) {
        const data = watch();
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
                    <HomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom color="primary">
                        You're almost done! Here's a summary:
                    </Typography>

                    <Box mt={3} textAlign="left">
                        <Typography sx={{ mb: 1 }}>
                            <strong>Property Type:</strong> {data.propertyType}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            <strong>Square Meters:</strong> {data.squareMeters} m²
                        </Typography>
                        <Typography>
                            <strong>Coverage:</strong> €{data.coverage}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    return null;
}

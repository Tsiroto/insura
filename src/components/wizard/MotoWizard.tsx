import {
    TextField,
    Typography,
    Stack,
    Box,
} from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import type {
    UseFormRegister,
    UseFormWatch,
    UseFormStateReturn,
} from 'react-hook-form';
import type { FormFields } from '../../types/form';

interface MotoWizardProps {
    step: number;
    register: UseFormRegister<FormFields>;
    watch: UseFormWatch<FormFields>;
    formState: UseFormStateReturn<FormFields>;
}


export default function MotoWizard({
                                       step,
                                       register,
                                       watch,
                                       formState,
                                   }: MotoWizardProps) {
    if (step === 0) {
        return (
            <Stack spacing={2}>
                <TextField
                    label="Moto Model"
                    fullWidth
                    inputRef={(el) => step === 0 && el?.focus()}
                    {...register('motoModel', { required: 'Required' })}
                    error={!!formState.errors.motoModel}
                    helperText={formState.errors.motoModel?.message}
                />
                <TextField
                    label="Engine Size (cc)"
                    fullWidth
                    type="number"
                    {...register('engineSize', {
                        required: 'Required',
                        min: { value: 49, message: 'Must be at least 50cc' },
                    })}
                    error={!!formState.errors.engineSize}
                    helperText={formState.errors.engineSize?.message}
                />
            </Stack>
        );
    }

    if (step === 1) {
        return (
            <Stack spacing={2}>
                <TextField
                    label="Driver Age"
                    fullWidth
                    type="number"
                    inputRef={(el) => step === 1 && el?.focus()}
                    {...register('driverAge', {
                        required: 'Required',
                        min: { value: 18, message: 'Must be 18+' },
                        max: { value: 100, message: 'Really? 😅' },
                    })}
                    error={!!formState.errors.driverAge}
                    helperText={formState.errors.driverAge?.message}
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
                    <TwoWheelerIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom color="primary">
                        You're almost done! Here's a summary:
                    </Typography>

                    <Box mt={3} textAlign="left">
                        <Typography sx={{ mb: 1 }}>
                            <strong>Moto Model:</strong> {data.motoModel}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            <strong>Engine Size:</strong> {data.engineSize} cc
                        </Typography>
                        <Typography>
                            <strong>Driver Age:</strong> {data.driverAge}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    return null;
}

import {
    TextField,
    Typography,
    Stack,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Controller } from 'react-hook-form';
import type {
    UseFormRegister,
    UseFormStateReturn,
    UseFormWatch,
    Control,
} from 'react-hook-form';
import type { FormFields } from '../../types/form';

interface HomeWizardProps {
    step: number;
    register: UseFormRegister<FormFields>;
    formState: UseFormStateReturn<FormFields>;
    watch: UseFormWatch<FormFields>;
    control: Control<FormFields>;
}

export default function HomeWizard({
    step,
    register,
    formState,
    control,
}: HomeWizardProps) {
    if (step === 0) {
        return (
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="property-type-label">Property Type</InputLabel>
                    <Controller
                        name="propertyType"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Required' }}
                        render={({ field }) => (
                            <Select
                                labelId="property-type-label"
                                label="Property Type"
                                {...field}
                                error={!!formState.errors.propertyType}
                            >
                                <MenuItem value="House">House</MenuItem>
                                <MenuItem value="Apartment">Apartment</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
                <TextField
                    label="Square Meters"
                    type="number"
                    fullWidth
                    inputProps={{ min: 35, max: 200 }}
                    {...register('squareMeters', {
                        required: 'Required',
                        min: { value: 35, message: 'Min 35' },
                        max: { value: 200, message: 'Max 200' },
                    })}
                    error={!!formState.errors.squareMeters}
                    helperText={formState.errors.squareMeters?.message}
                />
                <FormControl fullWidth>
                    <InputLabel id="ownership-status-label">Ownership Status</InputLabel>
                    <Controller
                        name="ownershipStatus"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Required' }}
                        render={({ field }) => (
                            <Select
                                labelId="ownership-status-label"
                                label="Ownership Status"
                                {...field}
                                error={!!formState.errors.ownershipStatus}
                            >
                                <MenuItem value="Owned">Owned</MenuItem>
                                <MenuItem value="Mortgaged">Mortgaged</MenuItem>
                                <MenuItem value="Rented">Rented</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="usage-label">Usage</InputLabel>
                    <Controller
                        name="usage"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Required' }}
                        render={({ field }) => (
                            <Select
                                labelId="usage-label"
                                label="Usage"
                                {...field}
                                error={!!formState.errors.usage}
                            >
                                <MenuItem value="Main residence">Main residence</MenuItem>
                                <MenuItem value="Holiday Home">Holiday Home</MenuItem>
                                <MenuItem value="Rental Property">Rental Property</MenuItem>
                            </Select>
                        )}
                    />
                </FormControl>
                <TextField
                    label="Construction Year"
                    type="number"
                    fullWidth
                    inputProps={{ min: 1980, max: 2025 }}
                    {...register('constructionYear', {
                        required: 'Required',
                        min: { value: 1980, message: 'Min 1980' },
                        max: { value: 2025, message: 'Max 2025' },
                    })}
                    error={!!formState.errors.constructionYear}
                    helperText={formState.errors.constructionYear?.message}
                />
                <TextField
                    label="Postal Code"
                    type="number"
                    fullWidth
                    {...register('postalCode', { required: 'Required' })}
                    error={!!formState.errors.postalCode}
                    helperText={formState.errors.postalCode?.message}
                />
            </Stack>
        );
    }
    if (step === 1) {
        return (
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    fullWidth
                    autoFocus
                    {...register('name', { required: 'Required' })}
                    error={!!formState.errors.name}
                    helperText={formState.errors.name?.message}
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
                    <HomeIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" gutterBottom color="primary">
                        You're almost done! Here's a summary:
                    </Typography>
                    <Box mt={3} textAlign="left">
                        <Typography>No data to display (fields are cleared on navigation).</Typography>
                    </Box>
                </Box>
            </Box>
        );
    }
    return null;
}

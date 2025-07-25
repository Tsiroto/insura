import {
    TextField,
    Stack,
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
import ContactInfoStep from './steps/ContactInfoStep';
import SummaryStep from './steps/SummaryStep';

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
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: '#ffffff',
                                    },
                                }}
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
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: '#ffffff',
                                    },
                                }}
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
                                sx={{
                                    '& .MuiSelect-select': {
                                        color: '#ffffff',
                                    },
                                }}
                                labelId="usage-label"
                                label="Usage"
                                {...field}
                                error={!!formState.errors.usage}
                            >
                                <MenuItem value="Main residence" color="#353535">Main residence</MenuItem>
                                <MenuItem value="Holiday Home" color="#353535">Holiday Home</MenuItem>
                                <MenuItem value="Rental Property" color="#353535">Rental Property</MenuItem>
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
        return <ContactInfoStep register={register} formState={formState} nameField="name" />;
    }
    if (step === 2) {
        return (
            <SummaryStep 
                icon={<HomeIcon />}
                message="No data to display (fields are cleared on navigation)."
            />
        );
    }
    return null;
}

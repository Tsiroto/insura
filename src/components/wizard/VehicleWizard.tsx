import { TextField, Stack } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import type {
    UseFormRegister,
    UseFormStateReturn,
} from 'react-hook-form';
import type { FormFields } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import ContactInfoStep from './steps/ContactInfoStep';
import SummaryStep from './steps/SummaryStep';

const currentYear = new Date().getFullYear();

interface VehicleWizardProps {
    step: number;
    register: UseFormRegister<FormFields>;
    formState: UseFormStateReturn<FormFields>;
    kind: 'car' | 'moto';
}

export default function VehicleWizard({
    step,
    register,
    formState,
    kind,
}: VehicleWizardProps) {
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
                        max: { value: currentYear, message: `Cannot be after ${currentYear}` },
                        valueAsNumber: true,
                    })}
                    error={!!formState.errors.registrationYear}
                    helperText={formState.errors.registrationYear?.message}
                />
            </Stack>
        );
    }

    if (step === 1) {
        return <ContactInfoStep register={register} formState={formState} nameField="ownerName" />;
    }

    if (step === 2) {
        return (
            <SummaryStep 
                icon={kind === 'car' ? <DirectionsCarIcon /> : <TwoWheelerIcon />}
                fields={[
                    { label: 'License Plate', value: data.licensePlate },
                    { label: 'Registration Year', value: data.registrationYear },
                    { label: 'Owner Name', value: data.ownerName },
                    { label: 'Email', value: data.email }
                ]}
            />
        );
    }

    return null;
}
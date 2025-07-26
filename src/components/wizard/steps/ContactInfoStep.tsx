import { TextField, Stack } from '@mui/material';
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form';
import type { FormFields } from '../../../types/form';

interface ContactInfoStepProps {
    register: UseFormRegister<FormFields>;
    formState: UseFormStateReturn<FormFields>;
    nameField: 'name' | 'ownerName';
}

export default function ContactInfoStep({
    register,
    formState,
    nameField,
}: ContactInfoStepProps) {
    return (
        <Stack spacing={2}>
            <TextField
                label={nameField === 'ownerName' ? 'Owner Name' : 'Name'}
                fullWidth
                autoFocus
                {...register(nameField, { required: 'Required' })}
                error={!!formState.errors[nameField]}
                helperText={formState.errors[nameField]?.message}
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
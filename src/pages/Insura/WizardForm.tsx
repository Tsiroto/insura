import { useForm } from 'react-hook-form';
import { useFormStore } from '../../store/formStore';
import {
    Box,
    Button,
    LinearProgress,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect } from 'react';
import * as React from "react";
import type {FormFields} from '../../types/form';


const steps = ['Insurable Details', 'Owner Info', 'Review'];

export default function WizardForm() {
    const { register, handleSubmit, setFocus } = useForm<FormFields>();
    const { type, step, setStep, updateData } = useFormStore();

    useEffect(() => {
        setFocus('field1');
    }, [step, setFocus]);

    const onSubmit = (data: FormFields) => {
        updateData(data);
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            console.log('Submit final form:', data);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    const renderIcon = () => {
        if (type === 'car') return <DirectionsCarIcon fontSize="large" />;
        if (type === 'moto') return <TwoWheelerIcon fontSize="large" />;
        return <HomeIcon fontSize="large" />;
    };

    return (
        <Box
            maxWidth="sm"
            mx="auto"
            mt={4}
            px={2}
            onKeyDown={handleKeyDown}
        >
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                {renderIcon()}
                <Typography variant="h6">
                    Tell us about your {type}
                </Typography>
            </Box>

            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <LinearProgress
                variant="determinate"
                value={((step + 1) / steps.length) * 100}
                sx={{ mt: 2 }}
            />

            <Box component="form" mt={4}>
                {step === 0 && (
                    <Stack spacing={2}>
                        <TextField
                            label="License Plate"
                            fullWidth
                            {...register('field1', { required: true })}
                        />
                        <TextField
                            label="Registration Year"
                            fullWidth
                            {...register('field2', { required: true })}
                        />
                    </Stack>
                )}

                {step === 1 && (
                    <Stack spacing={2}>
                        <TextField
                            label="Owner Name"
                            fullWidth
                            {...register('ownerName', { required: true })}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            {...register('email', { required: true })}
                        />
                    </Stack>
                )}

                {step === 2 && (
                    <Typography variant="body1">
                        You're almost done! Hit Enter to submit or edit previous steps.
                    </Typography>
                )}

                <Box display="flex" justifyContent="space-between" mt={4}>
                    <Button
                        variant="outlined"
                        disabled={step === 0}
                        onClick={() => setStep(step - 1)}
                    >
                        Back
                    </Button>

                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                        {step === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

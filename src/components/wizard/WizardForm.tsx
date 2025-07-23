import { useForm } from 'react-hook-form';
import { useFormStore } from '../../store/formStore';
import {
    Box,
    Button,
    LinearProgress,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { FormFields } from '../../types/form';
import * as React from 'react';
import CarWizard from './CarWizard';
import MotoWizard from './MotoWizard';
import HomeWizard from './HomeWizard';

const stepsByType = {
    car: ['Vehicle Info', 'Owner Info', 'Review'],
    moto: ['Vehicle Info', 'Owner Info', 'Review'],
    home: ['Property Info', 'Contact Info', 'Review'],
};

// helper to extract only relevant fields for each step
const stepFields: Record<string, Record<number, (keyof FormFields)[]>> = {
    car: {
        0: ['licensePlate', 'registrationYear'],
        1: ['ownerName', 'email'],
    },
    moto: {
        0: ['licensePlate', 'registrationYear'],
        1: ['ownerName', 'email'],
    },
    home: {
        0: ['propertyType', 'squareMeters', 'ownershipStatus', 'usage', 'constructionYear', 'postalCode'],
        1: ['name', 'email'],
    },
};

function getStepData(all: FormFields, type: string, step: number): FormFields {
    const keys = stepFields[type]?.[step] || [];
    return Object.fromEntries(keys.map((k) => [k, all[k]])) as FormFields;
}

export default function WizardForm() {
    const {
        register,
        handleSubmit,
        trigger,
        reset,
        setFocus,
        unregister,
        formState,
        control,
        watch,
    } = useForm<FormFields>({
        shouldUnregister: true,
    });

    const { type: paramType } = useParams();
    const navigate = useNavigate();
    const { type, step, setType, setStep, updateData, data } = useFormStore();

    // init once on mount
    useEffect(() => {
        if (paramType) {
            setType(paramType);
            reset(getStepData(data, paramType, 0));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // autofocus for fields per step
    useEffect(() => {
        if (step === 0) setFocus('licensePlate');
        if (step === 1) setFocus('ownerName');
    }, [step, setFocus]);

    const steps = stepsByType[type as keyof typeof stepsByType] || [];

    const onStepChange = (newStep: number) => {
        const currentStepKeys = stepFields[type]?.[newStep] || [];
        // Unregister all possible fields from all steps
        const allPossibleKeys = Array.from(
            new Set(Object.values(stepFields[type] || {}).flat())
        );
        allPossibleKeys.forEach((k) => {
            if (!currentStepKeys.includes(k)) unregister(k);
        });
        // Only reset with the fields for the new step
        const cleared: FormFields = {} as FormFields;
        currentStepKeys.forEach((k) => {
            cleared[k] = data[k] || '';
        });
        reset(cleared);
    };

    const onSubmit = (formValues: FormFields) => {
        const merged = { ...data, ...formValues };
        updateData(merged);
        if (step < steps.length - 1) {
            const nextStep = step + 1;
            setStep(nextStep);
            onStepChange(nextStep);
        } else {
            navigate('/insura/thank-you');
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const isValid = await trigger();
            if (isValid) {
                await handleSubmit(onSubmit)();
            }
        }
    };

    const renderIcon = () => {
        if (type === 'car') return <DirectionsCarIcon fontSize="large" />;
        if (type === 'moto') return <TwoWheelerIcon fontSize="large" />;
        return <HomeIcon fontSize="large" />;
    };

    return (
        <Box maxWidth="sm" mx="auto" mt={4} px={2} onKeyDown={handleKeyDown}>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
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
                {(type === 'car' && (
                        <CarWizard step={step} register={register} formState={formState} />
                    )) ||
                    (type === 'moto' && (
                        <MotoWizard step={step} register={register} formState={formState} />
                    )) ||
                    (type === 'home' && (
                        <HomeWizard step={step} register={register} formState={formState} control={control} watch={watch} />
                    ))}
                <Box
                    mt={4}
                    display="flex"
                    justifyContent={step === 0 ? 'flex-end' : 'space-between'}
                >
                    {step > 0 && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                const prevStep = step - 1;
                                setStep(prevStep);
                                onStepChange(prevStep);
                            }}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                        sx={{
                            minWidth: 120,
                            textTransform: 'none',
                            fontWeight: 500,
                        }}
                    >
                        {step === steps.length - 1 ? '✓ Submit' : 'Next →'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

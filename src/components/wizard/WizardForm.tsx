import * as React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

import type { FormFields } from '../../types/form';
import { useFormStore } from '../../store/formStore';
import VehicleWizard from './VehicleWizard';
import HomeWizard from './HomeWizard';

function pick<
    T extends object,
    K extends readonly (keyof T)[]
>(obj: T, keys: K): Partial<Pick<T, K[number]>> {
    const out: Partial<Pick<T, K[number]>> = {};
    keys.forEach((k) => {
        out[k] = obj[k];
    });
    return out;
}

type WizardKind = 'car' | 'moto' | 'home';

const stepsByType: Record<WizardKind, readonly string[]> = {
    car: ['Vehicle Info', 'Owner Info', 'Review'],
    moto: ['Vehicle Info', 'Owner Info', 'Review'],
    home: ['Property Info', 'Contact Info', 'Review'],
} as const;

const stepFields: Record<WizardKind, Record<number, readonly (keyof FormFields)[]>> = {
    car: {
        0: ['licensePlate', 'registrationYear'],
        1: ['ownerName', 'email'],
        2: [],
    },
    moto: {
        0: ['licensePlate', 'registrationYear'],
        1: ['ownerName', 'email'],
        2: [],
    },
    home: {
        0: [
            'propertyType',
            'squareMeters',
            'ownershipStatus',
            'usage',
            'constructionYear',
            'postalCode',
        ],
        1: ['name', 'email'],
        2: [],
    },
} as const;

function getStepData(all: FormFields, type: WizardKind, step: number) {
    const keys = (stepFields[type]?.[step] ?? []) as readonly (keyof FormFields)[];
    return pick(all, keys);
}

export default function WizardForm() {
    const {
        register,
        handleSubmit,
        trigger,
        reset,
        setFocus,
        formState,
        control,
    } = useForm<FormFields>({
        shouldUnregister: true,
    });

    const { type: paramType } = useParams();
    const navigate = useNavigate();
    const { type, step, setType, setStep, updateData, data } = useFormStore();

    useEffect(() => {
        const valid: WizardKind[] = ['car', 'moto', 'home'];
        if (!paramType || !valid.includes(paramType as WizardKind)) {
            navigate('/');
            return;
        }
        const kind = paramType as WizardKind;
        setType(kind);
        setStep(0);
        reset(getStepData(data, kind, 0));
    }, [paramType]);

    useEffect(() => {
        if (type === 'home') {
            if (step === 1) setFocus('name');
        } else {
            if (step === 0) setFocus('licensePlate');
            if (step === 1) setFocus('ownerName');
        }
    }, [type, step, setFocus]);

    const steps = stepsByType[type as WizardKind] ?? [];

    const onStepChange = (newStep: number) => {
        const keys = (stepFields[type as WizardKind]?.[newStep] ?? []) as readonly (keyof FormFields)[];
        const cleared = pick(data, keys);
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
            navigate('/thank-you');
        }
    };

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const isValid = await trigger();
            if (isValid) await handleSubmit(onSubmit)();
        }
    };

    const renderIcon = () => {
        if (type === 'car') return <DirectionsCarIcon fontSize="large" />;
        if (type === 'moto') return <TwoWheelerIcon fontSize="large" />;
        return <HomeIcon fontSize="large" />;
    };

    return (
        <Box
            maxWidth="md"
            width="100%"
            mx="auto"
            mt={4}
            px={3}
            onKeyDown={handleKeyDown}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.2)',
                p: 4,
                transition: 'all 0.2s ease-in-out',
            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                mb={3}
                sx={{ p: 2 }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        color: 'secondary.main',
                    }}
                >
                    {renderIcon()}
                </Box>
                <Typography variant="h6" fontWeight={500} color="text.primary">
                    Tell us about your {type}
                </Typography>
            </Box>

            <Box
                sx={{
                    p: 2,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '10px 10px 20px -6px rgba(0, 0, 0, 0.2)',
                    mb: 3,
                }}
            >
                <Stepper
                    activeStep={step}
                    alternativeLabel
                    sx={{
                        '& .MuiStepConnector-line': {
                            borderColor: 'rgba(0, 111, 234, 0.3)',
                        },
                        '& .MuiStepIcon-root': {
                            color: 'rgba(205, 205, 205, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(5px)',
                            borderRadius: '50%',
                        },
                        '& .MuiStepIcon-root.Mui-active': {
                            color: 'primary.main',
                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        },
                        '& .MuiStepIcon-root.Mui-completed': {
                            color: 'primary.light',
                        },
                        '& .MuiStepLabel-label': {
                            color: 'text.secondary',
                            mt: 1,
                        },
                        '& .MuiStepLabel-label.Mui-active': {
                            color: 'text.primary',
                            fontWeight: 500,
                        },
                    }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <LinearProgress
                    variant="determinate"
                    value={((step + 1) / steps.length) * 100}
                    sx={{
                        mt: 2,
                        height: 8,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 10,
                            backgroundColor: '#4DA9FF',
                        },
                    }}
                />
            </Box>

            <Box
                component="form"
                mt={4}
                sx={{
                    '& .MuiTextField-root': {
                        mb: 3,
                        width: '100%',
                        mx: 'auto',
                        display: 'block',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '10px',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(5px)',
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'primary.light',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.main',
                            },
                        },
                    },
                    '& .MuiFormControl-root': {
                        mb: 3,
                        width: '100%',
                        mx: 'auto',
                        display: 'block',
                    },
                }}
            >
                {(type === 'car' || type === 'moto') ? (
                    <VehicleWizard
                        step={step}
                        register={register}
                        formState={formState}
                        kind={type as 'car' | 'moto'}
                    />
                ) : (
                    <HomeWizard
                        step={step}
                        register={register}
                        formState={formState}
                        control={control}
                    />
                )}

                <Box mt={4} display="flex" justifyContent="space-between">
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/')}
                        sx={{
                            minWidth: 120,
                            fontWeight: 500,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '10px 10px 20px -6px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.2s ease-in-out',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
                            },
                            '&:active': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        Start Over
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        sx={{
                            minWidth: 120,
                            fontWeight: 500,
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.2s ease-in-out',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
                            },
                            '&:active': {
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        {step === steps.length - 1 ? '✓ Submit' : 'Next →'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

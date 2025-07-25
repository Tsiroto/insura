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
                sx={{
                    p: 2,
                    // borderRadius: 10,
                    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    // backdropFilter: 'blur(10px)',
                    // borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                    // borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    // boxShadow: '10px 10px 20px -6px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        // backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        // backdropFilter: 'blur(10px)',
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
                    mb: 3
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
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 10,
                            backgroundColor: 'primary.main',
                        }
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
                    }
                }}
            >
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
                            onClick={() => {
                                const prevStep = step - 1;
                                setStep(prevStep);
                                onStepChange(prevStep);
                            }}
                            sx={{
                                minWidth: 120,
                                fontWeight: 500,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                // borderRadius: '5000px',
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
                                }
                            }}
                        >
                            ← Back
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        sx={{
                            minWidth: 120,
                            fontWeight: 500,
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            // borderRadius: '5000px',
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
                            }
                        }}
                    >
                        {step === steps.length - 1 ? '✓ Submit' : 'Next →'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

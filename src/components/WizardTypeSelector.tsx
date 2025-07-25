import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';

const wizardTypes = [
    { label: 'Car', icon: DirectionsCarIcon, type: 'car' },
    { label: 'Motorcycle', icon: TwoWheelerIcon, type: 'moto' },
    { label: 'Home', icon: HomeWorkIcon, type: 'home' },
];

export default function WizardTypeSelector() {
    const navigate = useNavigate();

    const handleSelect = (type: string) => {
        navigate(`/insura/${type}`);
    };

    return (
        <Box mt={4} width="100%">
            <Typography variant="h6" align="center" color="text.primary" fontWeight="medium" gutterBottom>
                Select insurance type to proceed
            </Typography>
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={3}
                mt={3}
            >
                {wizardTypes.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <Card
                            key={item.type}
                            sx={{
                                width: '100%',
                                maxWidth: 260,
                                minWidth: 220,
                                transition: 'all 0.3s ease',
                                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                                borderRadius: 4,
                                overflow: 'hidden',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                                    boxShadow: '0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                                    '& .cardContent': {
                                        color: 'primary.main',
                                    },
                                    '& .cardIcon': {
                                        color: 'primary.main',
                                    }
                                },
                                '&:active': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1) inset',
                                    transform: 'translateY(0)',
                                }
                            }}
                        >
                            <CardActionArea
                                onClick={() => handleSelect(item.type)}
                                disableRipple
                                disableTouchRipple
                                sx={{
                                    backgroundColor: 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'transparent !important',
                                    },
                                    '& .MuiTouchRipple-root': {
                                        display: 'none',
                                    },
                                }}
                            >
                                <CardContent
                                    className="cardContent"
                                    sx={{
                                        textAlign: 'center',
                                        py: 4,
                                        color: 'text.secondary',
                                        transition: 'color 0.3s ease',
                                    }}
                                >
                                    <Box mb={2} className="cardIcon" sx={{ color: 'text.secondary', transition: 'color 0.3s ease' }}>
                                        <IconComponent fontSize="large" />
                                    </Box>
                                    <Typography variant="h6" fontWeight="medium">{item.label}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
}

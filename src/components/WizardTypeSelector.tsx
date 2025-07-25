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
        navigate(`/${type}`);
    };

    return (
        <Box mt={4} width="100%">
            <Typography 
                variant="h6" 
                align="center" 
                color="#fff" 
                fontWeight="medium" 
                gutterBottom
                sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
            >
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
                                transition: 'all 0.2s ease-in-out',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.2)',
                                overflow: 'hidden',
                                position: 'relative',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
                                    '& .cardContent': {
                                        color: '#fff',
                                    },
                                    '& .cardIcon': {
                                        color: '#fff',
                                    }
                                },
                                '&:active': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
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
                                        color: '#fff',
                                        transition: 'color 0.2s ease-in-out',
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <Box mb={2} className="cardIcon" sx={{ color: '#fff', transition: 'color 0.2s ease-in-out' }}>
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

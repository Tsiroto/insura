import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';

const wizardTypes = [
    { label: 'Car', icon: <DirectionsCarIcon fontSize="large" color="primary" />, type: 'car' },
    { label: 'Motorcycle', icon: <TwoWheelerIcon fontSize="large" color="primary" />, type: 'moto' },
    { label: 'Home', icon: <HomeWorkIcon fontSize="large" color="primary" />, type: 'home' },
];

export default function WizardTypeSelector() {
    const navigate = useNavigate();

    const handleSelect = (type: string) => {
        navigate(`/insura/${type}`);
    };

    return (
        <Box mt={4}>
            <Typography variant="h5" align="center" gutterBottom>
                Select a Type
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 3,
                    mt: 3,
                }}
            >
                {wizardTypes.map((item) => (
                    <Card
                        key={item.type}
                        sx={{
                            flex: '1 1 250px',
                            maxWidth: 300,
                            transition: 'transform 0.2s ease',
                            backgroundColor: 'transparent',
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
                            <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                <Box mb={1}>{item.icon}</Box>
                                <Typography variant="h6" color="primary">{item.label}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

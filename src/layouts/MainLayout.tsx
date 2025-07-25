import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import { Box, Container, Button } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AnimatedBackground from '../components/AnimatedBackground';

export default function MainLayout() {
    return (
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}>
            <AnimatedBackground elementCount={6} />
            <Box 
                sx={{
                    position: 'relative',
                    width: '100%',
                    backdropFilter: 'blur(2px)',
                    pt: 0
                }}
            >
                <Header />
                
                <Container maxWidth="lg" sx={{ pt: 2, pb: 6 }}>
                    <DotLottieReact
                        src="/insura/car_scene.lottie"
                        autoplay
                        loop
                        style={{ maxWidth: 360, margin: '0 auto' }}
                    />
                </Container>
            </Box>

            <Container component="main" maxWidth="lg" sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                py: 4
            }}>
                <Outlet />
            </Container>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Button 
                    component={Link}
                    to="readme"
                    variant="contained" 
                    color="primary"
                    sx={{ minWidth: 120 }}
                >
                    ReadMe
                </Button>
            </Box>
        </Box>
    );
}
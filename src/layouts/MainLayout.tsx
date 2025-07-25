import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box, Container, Paper } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function MainLayout() {
    return (
        <Box sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(-45deg, #c2d9f0, #d6e6f7, #a8c9f0, #b8d4f5)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
        }}>
            {/* Hero section with header */}
            <Box 
                sx={{
                    position: 'relative',
                    width: '100%',
                    backgroundColor: 'rgba(230, 240, 250, 0.4)',
                    backdropFilter: 'blur(10px)',
                    pt: 0
                }}
            >
                <Header />
                
                <Container maxWidth="lg" sx={{ pt: 2, pb: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            borderRadius: 4,
                        }}
                    >
                        <DotLottieReact
                            src="/insura/car_scene.lottie"
                            autoplay
                            loop
                            style={{ width: 300, margin: '0 auto' }}
                        />
                    </Paper>
                </Container>
            </Box>
            
            {/* Main content */}
            <Container component="main" maxWidth="lg" sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                py: 4
            }}>
                <Outlet />
            </Container>
        </Box>
    );
}
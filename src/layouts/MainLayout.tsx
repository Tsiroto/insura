import { Outlet, Link } from 'react-router-dom';
import Header from './Header';
import { Box, Container, Button } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useState, useEffect } from 'react';
import PageFade from '../components/PageFade';

const HERO_W = 360;
const HERO_H = 180;

export default function MainLayout() {
    const [showBackground, setShowBackground] = useState(false);
    const [showLottie, setShowLottie] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowBackground(true), 500);
        const t2 = setTimeout(() => setShowLottie(true), 250);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
        >
            {showBackground && <AnimatedBackground elementCount={6} />}

            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    pt: 0,
                }}
            >
                <Header />

                <Box
                    sx={{
                        minHeight: HERO_H,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {showLottie ? (
                        <PageFade durationMs={500}>
                            <DotLottieReact
                                src="/insura/car_scene.lottie"
                                autoplay
                                loop
                                speed={0.85}
                                style={{
                                    maxWidth: HERO_W,
                                    width: '100%',
                                    margin: '0 auto',
                                    background: 'transparent',
                                }}
                            />
                        </PageFade>
                    ) : (
                        <Box sx={{ width: HERO_W, height: HERO_H }} />
                    )}
                </Box>

            </Box>

            <PageFade durationMs={200} delayMs={0} sx={{ flexGrow: 1 }}>
                <Container
                    component="main"
                    maxWidth="lg"
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        py: 4,
                    }}
                >
                    <Outlet />
                </Container>
            </PageFade>

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

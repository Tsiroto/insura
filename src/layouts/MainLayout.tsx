import { Outlet } from 'react-router-dom';
import Header from './Header';
import { AppBar } from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function MainLayout() {
    return (
        <>
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                // sx={{ backgroundColor: 'background.paper' }}
            >
                <Header />
            </AppBar>
            <main>
                <DotLottieReact
                    src="/insura/car_scenery.lottie"
                    autoplay
                    loop
                    style={{ width: 300, margin: '0 auto' }}
                />
                <Outlet />
            </main>
        </>
    );
}
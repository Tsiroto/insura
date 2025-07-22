import { Container, Paper, Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import Header from './Header.tsx';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <Container maxWidth="sm" sx={{ py: 6 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box mb={4}>
                        <Typography variant="h5" fontWeight={600}>
                            Insura
                        </Typography>
                    </Box>
                    {children}
                </Paper>
            </Container>
        </>
    );
}

import { createTheme } from '@mui/material/styles';

const glassmorphism = {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
};

const glassmorphismHover = {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    boxShadow: '0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
};

const glassmorphismActive = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1) inset',
};

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#006fea',
            light: '#4a9bff',
            dark: '#0054b0',
        },
        secondary: {
            main: '#f4faff',
            light: '#ffffff',
            dark: '#d1e3f5',
        },
        background: {
            default: '#e6f0fa',
            paper: '#e6f0fa',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#2c4159',
        },
    },
    typography: {
        fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(-45deg, #c2d9f0, #d6e6f7, #a8c9f0, #b8d4f5)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient 15s ease infinite',
                    minHeight: '100%',
                },
                '@keyframes gradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 12,
                    padding: '10px 20px',
                    color: '#2c4159',
                    ...glassmorphism,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        ...glassmorphismHover,
                    },
                    '&:active': {
                        ...glassmorphismActive,
                    },
                },
                contained: {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: 'none',
                    borderRadius: 8,
                    '&:hover': {
                        transform: 'translateY(-5px)',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    borderBottom: 'none',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 20,
                    },
                },
            },
        },
    },
});

export default theme;

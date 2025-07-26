import { createTheme } from '@mui/material/styles';

const glassmorphism = {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease-in-out',
};

const glassmorphismHover = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
};

const glassmorphismActive = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
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
            default: '#FC466B',
            paper: '#3F5EFB',
        },
        text: {
            primary: '#fff',
            secondary: '#fff',
        },
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
    },
    shape: {
        borderRadius: '10px',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(45deg, #FC466B, #3F5EFB)',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    fontFamily: '"Montserrat", sans-serif',
                    margin: 0,
                    color: '#fff',
                },
                '::placeholder': {
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 400,
                    color: '#fff',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                },
                'a, input:focus, select:focus, textarea:focus, button:focus': {
                    outline: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    padding: '1em',
                    ...glassmorphism,
                    transition: 'all 0.2s ease-in-out',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        ...glassmorphismHover,
                        cursor: 'pointer',
                    },
                    '&:active': {
                        ...glassmorphismActive,
                    },
                },
                contained: {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    position: 'relative',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '10px',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center',
                    transition: 'all 0.2s ease-in-out',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    position: 'relative',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '10px',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center',
                    transition: 'all 0.2s ease-in-out',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: 'transparent',
                    padding: '0',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)',
                    boxShadow: '4px 4px 60px rgba(0, 0, 0, 0.2)',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 500,
                    transition: 'all 0.2s ease-in-out',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
                    },
                    '&.Mui-focused': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '1px',
                        },
                    },
                    '& fieldset': {
                        borderColor: 'transparent',
                    },
                },
                input: {
                    color: '#fff',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(2px)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(5px)',
                        '& fieldset': {
                            borderColor: 'transparent',
                            backgroundColor: 'rgba(255,255,255,0.15)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'primary.light',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'primary.main',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.75)',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.MuiInputLabel-shrink': {
                        transform: 'translate(14px, -10px) scale(0.75)',
                        color: '#fff',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    width: '100%',
                },
                icon: {
                    color: '#fff',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    borderRadius: 4,
                    color: '#000',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                    '&::before': {
                        display: 'none',
                    },
                    '&::after': {
                        display: 'none',
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(0, 111, 234, 0.08)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(50, 134, 134, 0.15)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 111, 234, 0.12)',
                        },
                    },
                },
            },
        },
    },
});

export default theme;

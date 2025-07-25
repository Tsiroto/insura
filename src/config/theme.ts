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

const dropStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '10px 10px 60px -8px rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    transition: 'all 0.2s ease',
};

const cardDropStyles = {
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    // backdropFilter: 'blur(12px)',
    borderRadius: '50%',
    borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '10px 10px 60px -8px rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    transition: 'all 0.2s ease',
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
                    // borderRadius: 5000,
                    padding: '1em',
                    // color: '#fff',
                    // fontWeight: 500,
                    // width: 150,
                    // fontSize: '1rem',
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
                    // padding: '3em',
                    borderRadius: '10px',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center',
                    transition: 'all 0.2s ease-in-out',
                    '&::before': {
                        content: '""',
                        ...dropStyles,
                        height: 80,
                        width: 80,
                        top: '8%',
                        left: '-1.5%',
                    },
                    '&::after': {
                        content: '""',
                        ...dropStyles,
                        height: 80,
                        width: 80,
                        bottom: '-14%',
                        right: '3%',
                    },
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
                    '&::before': {
                        content: '""',
                        ...cardDropStyles,
                        height: 60,
                        width: 60,
                        bottom: '60px',
                        right: '-10%',
                    },
                    '&::after': {
                        content: '""',
                        ...cardDropStyles,
                        height: 40,
                        width: 40,
                        top: '12px',
                        right: '-8px',
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
                    background: 'transparent',
                    padding: '0',
                    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(5px)',
                    boxShadow: '4px 4px 60px rgba(0, 0, 0, 0.2)',
                    color: '#fff',
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
                    },
                    '& fieldset': {
                        borderColor: 'transparent',
                    },
                },
                input: {
                    color: '#fff',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.MuiInputLabel-shrink': {
                        transform: 'translate(14px, -10px) scale(0.75)',
                        // color: '#fff',
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
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                    color: '#000',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'none',
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
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(50, 134, 134, 0.15)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                    },
                },
            },
        },
    },
});

export default theme;

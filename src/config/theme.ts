import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#006fea',
        },
        secondary: {
            main: '#f4faff',
        },
        background: {
            default: '#fdfeff',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#5f6c7b',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 6,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
    },
});

export default theme;

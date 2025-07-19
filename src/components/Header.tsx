import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Menu,
    MenuItem,
    IconButton,
    Divider,
    Button
} from '@mui/material';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuItemSelect = (action: string) => {
        if (target === 'insura') return;
        if (target === 'people') {
            window.location.href = '/react-to-people';
        }
        if (target === 'portfolio') {
            window.location.href = '/';
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                        Insura
                    </Typography>
                </Box>
                <Typography variant="body1" component="div">
                    Your Insurance Partner
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
import { Link } from 'react-router-dom';
import {
    Toolbar,
    Typography,
    Box,
    Menu,
    MenuItem,
    IconButton,
    Divider,
} from '@mui/material';
import logo from '../../public/logo.png';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BASE_PATH } from '../config/config';

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSelect = (target: string) => {
        if (target === 'insura') return;
        if (target === 'people') {
            window.location.href = '/react-to-people';
        }
        if (target === 'portfolio') {
            window.location.href = '/';
        }
    };

    return (
        <>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box
                    component={Link}
                    to={BASE_PATH}
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ textDecoration: 'none' }}
                >
                    <img src={logo} alt="Insura Logo" width={32} height={32} />
                    <Typography variant="h6" fontWeight={600} color="primary">
                        Insura
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={0}>
                    <Typography variant="h6" fontWeight={600} color="primary">
                        Projects
                    </Typography>
                    <IconButton onClick={handleOpenMenu} color="primary">
                        <MoreVertIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                        <MenuItem selected onClick={() => handleSelect('insura')}>
                            Insura (current)
                        </MenuItem>
                        <MenuItem onClick={() => handleSelect('people')}>React to People</MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handleSelect('portfolio')}>Portfolio</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </>
    );
}

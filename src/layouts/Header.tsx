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
import logo from '../../public/logo-t-blue.png';
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
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box
                    component={Link}
                    to={BASE_PATH}
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        textDecoration: 'none',
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Box 
                        sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            p: 0.5
                        }}
                    >
                        <img src={logo} alt="Insura Logo" width={30} height={30} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} color="#0a4c94">
                        Insura
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h6" fontWeight={500} color="#0a4c94">
                        Projects
                    </Typography>
                    <IconButton 
                        onClick={handleOpenMenu} 
                        sx={{ 
                            color: '#0a4c94',
                            backgroundColor: '#e6f0fa',
                            borderRadius: '50%',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#d1e3f5',
                            },
                            '&:active': {
                                backgroundColor: '#c2d9f0',
                            }
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu 
                        anchorEl={anchorEl} 
                        open={open} 
                        onClose={handleCloseMenu}
                        PaperProps={{
                            elevation: 1,
                            sx: {
                                borderRadius: 1,
                                backgroundColor: '#e6f0fa',
                                overflow: 'hidden',
                                mt: 1.5,
                                py: 0
                            }
                        }}
                    >
                        <MenuItem selected onClick={() => handleSelect('insura')}>
                            Insura (current)
                        </MenuItem>
                        <MenuItem onClick={() => handleSelect('people')}>React to People</MenuItem>
                        <Divider sx={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />
                        <MenuItem onClick={() => handleSelect('portfolio')}>Portfolio</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </>
    );
}

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
import logo from '../assets/logo-white-transparent.png';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BASE_PATH } from '../config/config';
import * as React from "react";

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
                    <Typography variant="h6" fontWeight={600} color="#fff">
                        Insura
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="h6" fontWeight={500} color="#fff">
                        Projects
                    </Typography>
                    <IconButton 
                        onClick={handleOpenMenu} 
                        sx={{ 
                            color: '#fff',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '50%',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                boxShadow: '4px 4px 60px 8px rgba(0, 0, 0, 0.2)',
                            },
                            '&:active': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                                backgroundColor: 'rgba(205, 205, 205, 0.3)',
                                backdropFilter: 'blur(6px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '20px 20px 40px -6px rgba(0, 0, 0, 0.3)',
                                overflow: 'hidden',
                                mt: 1,
                                py: 0,
                                // color: '#fff'
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

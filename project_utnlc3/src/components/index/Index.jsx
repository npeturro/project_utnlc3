import React, { useState, useContext } from 'react';
import CardProductLogged from '../cardProductLogged/CardProductLogged';
import { Box, Container, Stack, Button, Popover, MenuItem, MenuList } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user-context';

const Index = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const { userLoged } = useContext(UserContext);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box>
            <Container maxWidth="xl" sx={{ mt: '7%' }}>
                <Stack spacing={1}>
                    {userLoged.authenticated && (userLoged.role === "Admin" || userLoged.role === "SuperAdmin") && (
                        <Stack>
                            <div style={{ marginLeft: 'auto' }}>
                                <Button
                                    variant="contained"
                                    onClick={handlePopoverOpen}
                                >
                                    Opciones de administrador
                                </Button>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handlePopoverClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                >
                                    <div style={{ padding: '5px' }}>
                                        <MenuList
                                            disablePadding
                                            dense
                                            sx={{
                                                p: '8px',
                                                '& > *': {
                                                    borderRadius: 1
                                                }
                                            }}
                                        >
                                            <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <MenuItem onClick={handlePopoverClose}>
                                                    Ver productos
                                                </MenuItem>
                                            </Link>
                                            {userLoged.authenticated && userLoged.role === "SuperAdmin" && (
                                                <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <MenuItem onClick={handlePopoverClose}>
                                                        Ver usuarios
                                                    </MenuItem>
                                                </Link>
                                            )}
                                        </MenuList>
                                    </div>
                                </Popover>
                            </div>
                        </Stack>
                    )}
                    <CardProductLogged />
                    <img src='https://airoldi.com.ar/media/wysiwyg/Banner-CX_002_.jpg' alt="Banner" />
                </Stack>
            </Container>
        </Box>
    );
};

export default Index;

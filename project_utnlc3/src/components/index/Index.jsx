import React, { useState } from 'react';
import CardProductLogged from '../cardProductLogged/CardProductLogged';
import { Box, Container, Stack, Button, Popover, MenuItem, MenuList } from '@mui/material';
import { Link } from 'react-router-dom';

const Index = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Box>
                <Container maxWidth="xl">
                    <Stack spacing={1}>
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
                                            <MenuItem>
                                                Ver productos
                                            </MenuItem>
                                            <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <MenuItem onClick={handlePopoverClose}>
                                                    Crear producto
                                                </MenuItem>
                                            </Link>
                                            <MenuItem>
                                                Ver usuarios
                                            </MenuItem>
                                            <MenuItem>
                                                Crear usuario
                                            </MenuItem>
                                        </MenuList>
                                    </div>
                                </Popover>
                            </div>
                        </Stack>
                        <CardProductLogged />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Index;

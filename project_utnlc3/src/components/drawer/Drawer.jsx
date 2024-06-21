import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Menu from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';


export default function DrawerScrollable() {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <IconButton variant="outlined" style={{ color: 'white' }} onClick={() => setOpen(true)}>
                <Menu />
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <ModalClose />
                <DialogTitle>Categorias</DialogTitle>
                <DialogContent>
                    <List>
                        {[...new Array(100)].map((_, index) => (
                            <ListItem key={index}>
                                <ListItemButton onClick={() => setOpen(false)}>
                                    Item {index}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        p: 1.5,
                        pb: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Avatar size="lg" />
                    <div>
                        <Typography level="title-md">Username</Typography>
                        <Typography level="body-sm">joined 20 Jun 2023</Typography>
                    </div>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
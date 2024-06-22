import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/joy/Box';
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
import { UserContext } from '../../contexts/user-context';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from "axios";

const DrawerScroll = () => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const { userLoged } = useContext(UserContext);
    const [alert, setAlert] = useState({ message: "", type: "" });
    const navigate = useNavigate(); // Get navigate function from useNavigate

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const response = await axios.get("http://onetechapi-utn.ddns.net/api/productos");
            const productos = response.data;

            if (Array.isArray(productos)) {
                const categoriesFromProducts = productos.map(product => product.category);
                const uniqueCategories = [...new Set(categoriesFromProducts)];
                setCategories(uniqueCategories);
                setAlert({ message: "Categorías cargadas correctamente", type: "success" });
            } else {
                console.error('Unexpected data format:', productos);
                setAlert({ message: "Error al cargar las categorías", type: "error" });
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            setAlert({ message: "Error al cargar las categorías", type: "error" });
        }
    };

    const handleCategoryClick = (category) => {
        navigate(`/products/${category}`); // Navigate to products by category route
        setOpen(false); // Close drawer after selecting a category
    };

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
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <ListItem key={index}>
                                    <ListItemButton onClick={() => handleCategoryClick(category)}>
                                        {category}
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemButton>
                                    No hay categorías disponibles
                                </ListItemButton>
                            </ListItem>
                        )}
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
                    {userLoged.authenticated && (
                        <div>
                            <Typography level="title-md">Hola! {userLoged.name}</Typography>
                        </div>
                    )}
                </Box>
            </Drawer>
        </React.Fragment>
    );
}

export default DrawerScroll;

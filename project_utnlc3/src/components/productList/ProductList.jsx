import PropTypes from "prop-types";
import React from 'react';
import { List, ListItem, Grid, Button, Typography } from '@mui/material';

const ProductList = ({ productos, handleEdit, handleDelete }) => {
  return (
    <List sx={{ mb: 4 }}>
      {productos.map((producto) => (
        <ListItem
          key={producto.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          divider
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1">
                <strong>{producto.name}</strong> - {producto.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
              </Typography>
              <Typography variant="body2">
                {producto.description}
              </Typography>
              <Typography variant="caption">
                Categoría: {producto.category}
              </Typography>
              <br />
              <Typography variant="caption">
                Stock: {producto.stock}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} container justifyContent="flex-end" alignItems="center">
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => handleEdit(producto)}
                sx={{ mr: 2 }}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(producto.id)}
              >
                Eliminar
              </button>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};


ProductList.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      description: PropTypes.string,
      image: PropTypes.string,
      category: PropTypes.string,
      stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ProductList;

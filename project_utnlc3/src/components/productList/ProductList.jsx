import PropTypes from "prop-types";

const ProductList = ({ productos, handleEdit, handleDelete }) => {
  return (
    <ul className="list-group mb-4">
      {productos.map((producto) => (
        <li
          key={producto.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{producto.name}</strong> - ${producto.price} <br />
            <small>{producto.description}</small> <br />
            <small>Categoría: {producto.category}</small> <br />
            <small>Stock: {producto.stock}</small>
          </div>
          <div>
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => handleEdit(producto)}
            >
              Editar
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(producto.id)}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
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

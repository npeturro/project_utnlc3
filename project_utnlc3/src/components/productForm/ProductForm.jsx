import PropTypes from 'prop-types';

const ProductForm = ({
  nombre, setNombre,
  precio, setPrecio,
  imagen, setImagen,
  descripcion, setDescripcion,
  stock, setStock,
  productoId, handleSubmit, resetForm
}) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div> <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success me-2">{productoId ? 'Actualizar' : 'Añadir'}</button>
      {productoId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancelar</button>}
    </form>
  );
};

ProductForm.propTypes = {
  nombre: PropTypes.string.isRequired,
  setNombre: PropTypes.func.isRequired,
  precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setPrecio: PropTypes.func.isRequired,
  imagen: PropTypes.string.isRequired,
  setImagen: PropTypes.func.isRequired,
  descripcion: PropTypes.string.isRequired,
  setDescripcion: PropTypes.func.isRequired,
  productoId: PropTypes.number,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default ProductForm;

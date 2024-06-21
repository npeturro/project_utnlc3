import PropTypes from "prop-types";

const ProductView = ({ producto }) => {
  return (
    <div className="card mb-4">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={producto.image} className="card-img" alt={producto.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{producto.name}</h5>
            <p className="card-text">
              <strong>Price:</strong> ${producto.price}
            </p>
            <p className="card-text">
              <strong>Description:</strong> {producto.description}
            </p>
            <p className="card-text">
              <strong>Category:</strong> {producto.category}
            </p>
            <p className="card-text">
              <strong>Stock:</strong> {producto.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default ProductView;

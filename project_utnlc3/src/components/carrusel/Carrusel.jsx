/*
import { Carousel } from 'react-bootstrap'; // Importa Carousel y Carousel.Item desde react-bootstrap
import PropTypes from 'prop-types';

const Carrusel = ({ products }) => {
  return (
    <div className="carousel-container">
      <h2>Productos Destacados</h2>
      <Carousel interval={2000} indicators={true} className="product-carousel">
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <img
              className="d-block w-100 product-image"
              src={product.image}
              alt={product.name}
            />
            <Carousel.Caption>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

Carrusel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Carrusel;*/
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Carrusel.css';

const Carrusel = ({ products }) => {
  return (
    <div className="carousel-container">
      <h2>Productos Destacados</h2>
      <Carousel variant="dark" interval={2000} indicators={true} className="product-carousel">
        {products.map((product) => (
          <Carousel.Item key={product.id} className="carousel-item">
            <img
              className="d-block w-100 product-image"
              src={product.image}
              alt={product.name}
            />
            <Carousel.Caption>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

Carrusel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      descriptio: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Carrusel;
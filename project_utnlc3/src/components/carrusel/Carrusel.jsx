
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Carrusel.css'; 

const Carrusel = ({ products }) => {
  return (
    <div className="carousel-container">
      <h2>Productos Destacados</h2>
      <Carousel variant="dark" interval={2000} indicators={true} className="product-carousel">
        {products.map((product) => (
         <Carousel.Item key={product.id}>
         <div className="product-slide">
           <img
             className="d-block w-100 product-image"
             src={product.image}
             alt={product.name}             
           />
           <div className="product-details">
             <h3>{product.name}</h3>
             <p>{product.description}</p>
             <p>{product.price}</p>
           </div>
         </div>
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
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Carrusel;
import { useRef, useEffect } from 'react';
import { Carousel, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './AutoScrollCarousel.css'; 


const AutoScrollCarousel = ({ products }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    }, 1000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  return (
    <div className="autoscroll-carousel-container">
      <h2>Productos Destacados</h2>
      <Carousel ref={carouselRef} interval={null} className="autoscroll-carousel">
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <Card className="product-card">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Precio: {product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

AutoScrollCarousel.propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired
      })
    ).isRequired
  };
export default AutoScrollCarousel;

import { Carousel } from "react-bootstrap";
import PropTypes from "prop-types";
import CardProductLogged from "../cardProductLogged/CardProductLogged";
import "./Carrusel.css";

const Carrusel = ({ products, text = "ONE TECH - TRANSFORMING IDEAS INTO REALITY" }) => {
  const groupedProducts = [];

  // Agrupar productos en conjuntos de 4
  for (let i = 0; i < products.length; i += 4) {
    groupedProducts.push(products.slice(i, i + 4));
  }

  return (
    <div className="carousel-container">
      <h2 style={{ textAlign: "center" }}>
        {text}{" "}
      </h2>
      <Carousel
        variant="dark"
        interval={8000}
        indicators={true}
        className="product-carousel"
      >
        {groupedProducts.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="product-slide">
              {group.map((product) => (
                <div key={product.id} className="product-card">
                  <CardProductLogged product={product} />
                </div>
              ))}
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
      category: PropTypes.string,
      oldPrice: PropTypes.string,
      price: PropTypes.number.isRequired,
      stock: PropTypes.number,
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carrusel;

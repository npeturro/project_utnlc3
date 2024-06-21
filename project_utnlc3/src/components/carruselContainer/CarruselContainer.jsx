import { useState, useEffect } from "react";
import axios from "axios";
import Carrusel from "../carrusel/Carrusel";

const CarruselContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://onetechapi-utn.ddns.net/api/productos")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  return <Carrusel products={products} />;
};

export default CarruselContainer;

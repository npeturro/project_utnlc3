import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardProductLogged from '../cardProductLogged/CardProductLogged';
import { useParams } from 'react-router-dom';


const ProductsByCategory = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await axios.get(`http://onetechapi-utn.ddns.net/api/Productos/categoria/${category}`);
                const filteredProducts = response.data;
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductsByCategory();
    }, [category]);



    return (
        <div>
            <h1 style={{ padding: '15px' }}>Productos en categoria {category}:</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {products.map(product => (
                    <CardProductLogged product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsByCategory;

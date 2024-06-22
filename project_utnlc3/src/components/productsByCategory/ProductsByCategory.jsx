import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import CardCover from "@mui/joy/CardCover";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";


const ProductsByCategory = ({ selected }) => {
    const category = selected;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await axios.get(`http://onetechapi-utn.ddns.net/api/productos?categoria=${category}`);
                const filteredProducts = response.data;
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductsByCategory();
    }, [category]);
    const [hoveredCardId, setHoveredCardId] = useState(null);


    return (
        <div>
            <h1>Productos en {category}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {products.map(product => (
                    <Card
                        key={product.id}
                        sx={{
                            width: 200, // Reduced width
                            maxWidth: "100%",
                            boxShadow: "sm",
                            transition: "transform 0.2s ease",
                            transform: hoveredCardId === product.id ? "scale(1.05)" : "scale(1)",
                        }}
                        variant="soft"
                        onMouseEnter={() => setHoveredCardId(product.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                    >
                        <CardOverflow>
                            <AspectRatio minHeight="200px" sx={{ minWidth: 160 }}> {/* Reduced minHeight and minWidth */}
                                <img src={product.image} loading="lazy" alt={product.name} />
                            </AspectRatio>
                        </CardOverflow>
                        <CardCover
                            sx={{
                                background:
                                    "linear-gradient(to top, rgba(207, 220, 226, 0.2), rgba(0,0,0,0) 150px), linear-gradient(to top, rgba(207, 220, 226, 0.4), rgba(0,0,0,0) 200px)",
                                borderColor: "#777",
                            }}
                        ></CardCover>
                        <CardContent sx={{ padding: '8px' }}> {/* Reduced padding */}
                            <Typography level="body-xs" fontSize="small">{product.category}</Typography> {/* Adjust font size */}
                            <Link
                                href={product.link}
                                target="_blank"
                                fontWeight="lg"
                                color="neutral"
                                textColor="text.primary"
                                level="h3"
                                sx={{ fontSize: 'medium' }} // Adjust font size
                            >
                                {product.name}
                            </Link>
                            <Typography
                                sx={{
                                    textDecoration: "line-through",
                                    color: "rgba(0, 0, 0, 0.8)",
                                    fontSize: 'small', // Adjust font size
                                }}
                            >
                                {product.oldPrice}
                            </Typography>
                            <Typography level="title-lg" sx={{ mt: 1, fontWeight: "xl", fontSize: 'large' }}> {/* Adjust font size */}
                                $ {product.price}{" "}
                                <Chip variant="soft" color="success" size="sm">
                                    Oferta
                                </Chip>
                            </Typography>
                            <Typography level="body-sm" fontStyle={"italic"} fontSize="small"> {/* Adjust font size */}
                                <b>{product.stock}</b> Unidades disponibles
                            </Typography>
                        </CardContent>
                        <CardOverflow>
                            <Button
                                variant="solid"
                                color="primary"
                                size="md" // Adjust button size
                                startDecorator={<AddShoppingCartIcon />}
                                sx={{ fontSize: 'small' }} // Adjust font size
                            >
                                Agregar al carrito
                            </Button>
                        </CardOverflow>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ProductsByCategory;

import { useState, useContext } from "react";
import PropTypes from "prop-types";
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
import { UserContext } from "../../contexts/user-context";
import { CartContext } from "../../contexts/cart-context";
import { useNavigate } from 'react-router-dom';

const CardProductLogged = ({ product }) => {
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const { userLoged } = useContext(UserContext);
  const { addCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const handleLinkClick = (event) => {
    event.preventDefault();
    navigate(`/productView/${product.id}`, { state: { product } });
  };

  return (
    <Card
      key={product.id}
      sx={{
        width: 270,
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
        <AspectRatio ratio="4/3">
          <img
            src={product.image}
            loading="lazy"
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </AspectRatio>
      </CardOverflow>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(207, 220, 226, 0.2), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(207, 220, 226, 0.4), rgba(0,0,0,0) 300px)",
          borderColor: "#777",
        }}
      ></CardCover>
      <CardContent>
        <Typography level="body-xs">{product.category}</Typography>
        <Link
          href={`/productView/${product.id}`}
          onClick={handleLinkClick}
          fontWeight="lg"
          color="neutral"
          textColor={
            hoveredCardId === product.id ? "text.primary" : "text.disabled"
          }
          level="h3"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textDecoration: "none",
            color: hoveredCardId === product.id ? "grey" : "inherit",
            "&:hover": {
              color: "grey",
              textDecoration: "none",
              cursor: 'pointer'
            },
          }}
        >
          {product.name}
        </Link>

        <Typography
          sx={{
            textDecoration: "line-through",
            color: "rgba(0, 0, 0, 0.8)",
          }}
        >
          {product.oldPrice}
        </Typography>
        <Typography level="title-lg" sx={{ mt: 1, fontWeight: "xl" }}>
          {
            product.price > 1500000 ? (
              <>
                <span style={{ textDecoration: 'line-through' }}>
                  {product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                </span>
                <br />
                {((product.price * 0.95)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}{" "}
                <Chip variant="soft" color="success" size="sm">
                  Oferta
                </Chip>
              </>
            ) : (
              product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
            )
          }


        </Typography>
        <Typography level="body-sm" fontStyle={"italic"}>
          <b>{product.stock}</b> Unidades disponibles
        </Typography>
      </CardContent>
      {userLoged.authenticated && (
        <CardOverflow>
          <Button
            variant="solid"
            color="primary"
            size="lg"
            startDecorator={<AddShoppingCartIcon />}
            onClick={() => addCart(product)}
          >
            Agregar al carrito
          </Button>
        </CardOverflow>
      )}
    </Card>
  );
};

CardProductLogged.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    oldPrice: PropTypes.string,
    price: PropTypes.string.isRequired,
    stock: PropTypes.number,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProductLogged;

import React, { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import CardCover from '@mui/joy/CardCover';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const product = [
  {
    id: 1,
    name: 'Notebook Lenovo 15.6 TBOOK I7-1255U',
    price: 1151733,
    quantity: 1,
    image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/6/2/62a0f694a61291bd2fb48a0e5202af0d29fbdb5e6fece4c23fda1fe571e1556c.jpeg"
  },
  {
    id: 2,
    name: 'Silla Gamer Primus Thronos 200S Negra con Purpura',
    price: 482662,
    quantity: 1,
    image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/c/9/c9014594b3bad2d87835d1fa65ba8f79f84f66595d02b492e84f9009936658b0.jpeg"
  },
  {
    id: 3,
    name: 'Celular Xiaomi Poco F4 GT 5G 12GB 256GB Negro',
    price: 842405,
    quantity: 1,
    image: "https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/e/9/e95f1c0ccd035e4ab4367ce801753b96db40fe580645e95fe749f7bcce115640.jpeg"
  }
];


const CardProductLogged = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{
        width: 300,
        maxWidth: '100%',
        boxShadow: 'sm',
        transition: 'transform 0.2s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      variant="soft"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardOverflow>
        <AspectRatio minHeight="320px" sx={{ minWidth: 200 }}>
          <img
            src={product.image}
            loading="lazy"
            alt={product.name}
          />
        </AspectRatio>
      </CardOverflow>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(207, 220, 226, 0.2), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(207, 220, 226, 0.4), rgba(0,0,0,0) 300px)',
          borderColor: '#777',
        }}
      ></CardCover>
      <CardContent>
        <Typography level="body-xs">{product.category}</Typography>
        <Link
          href={product.link}
          target="_blank"
          fontWeight="lg"
          color="neutral"
          textColor="text.primary"
          level="h3"
        >
          {product.name}
        </Link>
        <Typography sx={{ textDecoration: 'line-through', color: 'rgba(0, 0, 0, 0.8)' }}>
          {product.oldPrice}
        </Typography>
        <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'xl' }}>
          {product.price} <Chip variant="soft" color="success" size="sm">Oferta</Chip>
        </Typography>
        <Typography level="body-sm" fontStyle={'italic'}>
          <b>{product.stock}</b> Unidades disponibles
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="primary" size="lg" startDecorator={<AddShoppingCartIcon />}>
          Agregar al carrito
        </Button>
      </CardOverflow>
    </Card>
  );
};

export default CardProductLogged;

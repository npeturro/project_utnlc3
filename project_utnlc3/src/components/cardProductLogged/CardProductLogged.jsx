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

function CardProductLogged() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{
        width: 350,
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
            src="https://airoldi.com.ar/media/catalog/product/cache/a3a61ce6d0a1e741ba8660988e04b8f1/6/2/62a0f694a61291bd2fb48a0e5202af0d29fbdb5e6fece4c23fda1fe571e1556c.jpeg"
            loading="lazy"
            alt=""
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
        <Typography level="body-xs">Notebook Gamer</Typography>
        <Link
          href="https://airoldi.com.ar/notebook-lenovo-15-6-tbook-i7-1255u-8gb-ssd512gb-sin-sistema-operativo.html"
          target="_blank"
          fontWeight="lg"
          color="neutral"
          textColor="text.primary"
          level="h3"
        >
          Notebook Lenovo 15.6 TBOOK I7-1255U
        </Link>

        <Typography sx={{ textDecoration: 'line-through', color: 'rgba(0, 0, 0, 0.8)' }}>
          $ 1.151.733
        </Typography>

        <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'xl' }}>
          $ 1.151.732 <Chip variant="soft" color="success" size="sm">Oferta</Chip>
        </Typography>
        <Typography level="body-sm" fontStyle={'italic'}>
          <b>7</b> Unidades disponibles
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="primary" size="lg" startDecorator={<AddShoppingCartIcon />}>
          Agregar al carrito
        </Button>
      </CardOverflow>
    </Card>
  );
}

export default CardProductLogged;
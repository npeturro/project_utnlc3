import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import pic1 from "../../images/a.png";
import pic2 from "../../images/b.png";

const HoverImageContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    paddingBottom: '75%',
    overflow: 'hidden',
    '&:hover .hover-img': {
        opacity: 1,
    },
});

const Image = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease-in-out',
});

const InitialImage = styled(Image)({
    opacity: 1,
});

const HoverImage = styled(Image)({
    opacity: 0,
});

const About = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Box textAlign="center" marginBottom="2rem">
                <Typography variant="overline" component="div" gutterBottom>
                    NUESTRA MISIÓN
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Simplificamos tu vida
                </Typography>
                <Typography variant="body1" component="p">
                    En One Tech nos comprometemos a ofrecer productos electrónicos de alta calidad que mejoren la vida diaria de nuestros clientes.
                    Nuestra misión es proporcionar una experiencia de compra excepcional mediante un servicio al cliente de primer nivel, precios competitivos y
                    una amplia selección de las últimas innovaciones tecnológicas. Nos esforzamos por ser líderes en el mercado, promoviendo la sostenibilidad y
                    la responsabilidad social a través de prácticas comerciales éticas y el apoyo a nuestras comunidades.
                </Typography>
            </Box>

            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="overline" component="div" gutterBottom>
                        NUESTRA GENTE
                    </Typography>
                    <Typography variant="overline"  component="h2" gutterBottom>
                        Estamos para ayudarte
                    </Typography>
                    <Typography variant="body1" component="p">
                        Nuestra misión es crear un ambiente de trabajo inclusivo y motivador donde cada miembro del staff se sienta valorado y empoderado para alcanzar
                        su máximo potencial. Fomentamos el desarrollo profesional continuo, la colaboración y la innovación, asegurándonos de que todos tengan las herramientas
                        y el apoyo necesarios para ofrecer un servicio excepcional a nuestros clientes y contribuir al éxito de la empresa.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <HoverImageContainer>
                        <InitialImage
                            src={pic1}
                            alt="Initial Image"
                        />
                        <HoverImage
                            src={pic2}
                            alt="Hover Image"
                            className="hover-img"
                        />
                    </HoverImageContainer>
                </Grid>
            </Grid>
        </Container>
    );
};

export default About;

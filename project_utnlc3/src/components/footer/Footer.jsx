import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';
import fondo from '../../images/footer.jpg';

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', top: 'auto', bottom: 0, width: '100%' }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" component="div">
            © {new Date().getFullYear()} ONE TECH. Todos los derechos reservados.
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" component="a" href="https://www.facebook.com" target="_blank" aria-label="facebook">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" component="a" href="https://www.twitter.com" target="_blank" aria-label="twitter">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" component="a" href="https://www.instagram.com" target="_blank" aria-label="instagram">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" component="a" href="https://www.linkedin.com" target="_blank" aria-label="linkedin">
            <LinkedInIcon />
          </IconButton>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/privacy" style={{ textDecoration: 'none', color: 'inherit', marginRight: 10 }}>
            <Typography variant="body2">
              Privacidad
            </Typography>
          </Link>
          <Link to="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body2">
              Términos y Condiciones
            </Typography>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;

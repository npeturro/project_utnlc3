import { IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
    const message = encodeURIComponent('Hola ONE TECH');
  const handleClick = () => {
    
    window.open(`https://wa.me/+5492364566126?text=${message}`, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 1000,
    }}>
      <IconButton
        color="_dark"
        onClick={handleClick}
        sx={{
          bgcolor: 'green', 
          '&:hover': {
            bgcolor: 'darkgreen', 
          },
          width: '55px', 
          height: '55px', 
        }}
      >
        <WhatsAppIcon sx={{ fontSize: '40px',color: 'white' }} />
      </IconButton>
    </div>
  );
};

export default WhatsAppButton;
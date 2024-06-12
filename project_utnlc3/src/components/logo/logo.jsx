import logoImage from '../../images/icon one tech_Blanco fondo transparente.png'

const Logo = () => {
    return (
      <div className="logo">
        <img src={logoImage} alt="Logo" style={{ maxWidth: '100px' }} />
      </div>
    );
  };
  
  export default Logo;
import logoImage from 'C:/Users/Lucio/Desktop/Programacion/3er Cuatrimestre/Laboratorio de computacion 3/tpi-test/src/images/icon one tech_Blanco fondo transparente.png'

const Logo = () => {
    return (
      <div className="logo">
        <img src={logoImage} alt="Logo" style={{ maxWidth: '100px' }} />
      </div>
    );
  };
  
  export default Logo;
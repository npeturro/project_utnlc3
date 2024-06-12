import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div>No hay nada para este path</div>
      <Button onClick={handleClick}>Volver al inicio</Button>
    </>
  );
};

export default NotFound;

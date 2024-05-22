import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Logo from '../logo/logo'; 
import './NavigationBar.css';
import CartIcon from '../cartIcon/CartIcon';
import { FaSearch } from 'react-icons/fa';

const NavigationBar = () => {
    return (
      <Navbar bg="light" expand="lg"className="custom-navbar">
        <Container>
          {}
          <Navbar.Brand href="#home">
          <Logo />
          </Navbar.Brand>
  
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Form className="d-flex me-2">
              <FormControl type="search" placeholder="Ingrese Productos..." className="mr-2" aria-label="Buscar" />
              <Button variant="outline-success"><FaSearch className="search-icon" /></Button>
            </Form>
                <Button href="#login">Iniciar Sesión</Button>
                
            </Nav>

            <Nav>
              <Nav.Link href="#cart">
                <CartIcon />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default NavigationBar;
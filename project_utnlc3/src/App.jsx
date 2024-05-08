import Header from './components/header/Header';
import NavBar from './components/navBar/NavBar'
//import AutoScrollCarousel from './components/autoScrollCarousel/AutoScrollCarousel';
import Carousel from './components/carousel/Carousel';
import NavigationBar from './components/navigationBar/NavigationBar';
import Carrusel from './components/carrusel/Carrusel';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const products = [
    {
      id: 1,
      name: 'Teclado Gamer',
      image: 'https://http2.mlstatic.com/D_NQ_NP_981517-MLA49851356855_052022-O.webp',
      description: 'Teclado gamer',
      price: '$10000'
    },
    {
      id: 2,
      name: 'Monitor Curvo',
      image: 'https://http2.mlstatic.com/D_NQ_NP_954558-MLU70014305250_062023-O.webp',
      description: 'Monitor curvo',
      price: '$150000'
    },
    {
      id: 3,
      name: 'Mouse gamer',
      image: 'https://compuvip.com.ar/wp-content/uploads/2022/05/Mouse-gamer-RGB-ONIKUMA-CW905-COMPUVIP.png',
      description: 'Mouse gamer',
      price: '$12000'
    },
    {
      id: 4,
      name: 'IPhone 15 Pro',
      image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRh2C4-mKrraZpSUpWxB64KSIxrcyFkwsSh70EsTuBWDqw0b04x09m29olxi5w4TV_8hk198l1k5h44de6i5kcrgvGU-e44',
      description: 'IPhone 15',
      price: '$1500000'
    },
    {
      id: 5,
      name: 'Monitor Curvo',
      image: 'https://http2.mlstatic.com/D_NQ_NP_954558-MLU70014305250_062023-O.webp',
      description: 'Monitor curvo',
      price: '$150000'
    },
  ];


  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        <h1>Bienvenido a ONE TECH</h1>
        <p>Transforming Ideas Into Reality...</p>
      </div>
      <div><Carrusel products={products} /></div>
      
    </div>
  );
}

export default App;
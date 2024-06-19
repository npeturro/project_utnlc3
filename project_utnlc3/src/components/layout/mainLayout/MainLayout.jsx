import Carrusel from '../../carrusel/Carrusel';
import NavBar from '../../navBar/NavBar';
import './MainLayout.css'
import Footer from '../../footer/Footer';
import WhatsAppButton from '../../whatsappButton/WhatsappButoon';
import ProductCrud from '../../crudProducts/CrudProducts';

const MainLayout = ({ children, onLogOff }) => {


    return (
        <div className='main-layout'>
            <div className='header'>
                <NavBar onLogOff = {onLogOff}/>
            </div>
            <div className='content'>
                {children}
            </div>
            <div className='footer'>
                <ProductCrud />
                <WhatsAppButton />
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout
import Carrusel from '../../carrusel/Carrusel';
import NavBar from '../../navBar/NavBar';
import './MainLayout.css'


const MainLayout = ({ children, onLogOff }) => {


    return (
        <div className='main-layout'>
            <div className='header'>
                <NavBar onLogOff = {onLogOff}/>
            </div>
            <div className='content'>
                <Carrusel />
                {children}
            </div>
            <div className='footer'>
                {/* {footer ?} */}
            </div>
        </div>
    )
}

export default MainLayout
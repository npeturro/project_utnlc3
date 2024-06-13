import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import CardProductLogged from "./components/cardProductLogged/CardProductLogged";
import Login from "./components/login/Login";
import Cart from './components/cart/Cart';
import { useState } from 'react';
import MainLayout from './components/layout/mainLayout/MainLayout';
import NotFound from './components/notFound/NotFound';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const loginHandler = () => {
      setIsLoggedIn(true);
    };
  
    const logOutHandler = () => {
      setIsLoggedIn(false);
    };

    const router = createBrowserRouter ([
        {
            path: "/login",
            element: (
                <MainLayout>
                    <Login onLogin = {loginHandler} />
                </MainLayout>
            )
        },
        {
            path: "/cart",
            element: (
                <MainLayout>
                    <Cart/>
                </MainLayout>
            )
        },
        {
            path: "/",
            element: (
                // <Protected isSignedIn = {isLoggedIn}>
                    <MainLayout onLogOff = {logOutHandler} />
                // </Protected>
            )
        },
        {
            path: "*",
            element: <NotFound />,
          },
    ]);

    return (
        <div>
            {<RouterProvider router={router} />}
        </div>
    )

}

export default App;


/*
Lo que pensé:

* Path principal, donde se llama a un elemento MainLayout y se le pasa el dashboard principal con la card dependiendo de si está logueado o no para armar el mapeo
    {
        path: "/",
        element: (
            <MainLayout>
                <DashBoard>
                    (loggedIn ? <CardProductLogged /> : <CardProductNotLogged />) 
                <DashBoard />
            <MainLayout />
    },
El filtrado de la búsqueda supongo que estaría hecho acá mismo, el loggedIn estaría en el context y lo llamamos desde el Dashboard directamente

En el MainLayout tendriamos:
    return (
        <div className='main-layout'>
            <div className='header'>
                <NavBar />
            </div>
            <div className='content'>
                {children}
            </div>
            <div className='footer'>
                    {footer ?} 
            </div>
        </div>
    )
Children varía dependiendo de la ruta que usemos 
En el header y footer siempre mostrariamos lo mismo, entonces para todas las rutas que usemos pasamos el MainLayout que ya tiene fijos esos elementos y cambiamos solo el children

* Path para el login:
    {
        path: "/login",
        element: (
        <MainLayout>
            <Login onLogin = {loginHandler} />
        <MainLayout />
        )
    },


* Path para vista de productos:
    {
        path: "product/:id",
        element: (
            <MainLayout>
                (loggedIn ? <CardProductLogged /> : <CardProductNotLogged />)
            <MainLayout />
        )
    },
Igual que el path principal pero solamente con la vista de la card dependiendo de si está logueado o no

* Path para ruta sin respuesta:
    {
        path: "*",
        element: (
            <MainLayout>
                <NotFound />
            <MainLayout />
        )
    },
NotFound es un elemento que nos indicaría que el elemento o la ruta no existe

* Path de Carrito:
    {
        path: "/checkout",
        element: (
            <MainLayout>
                <Cart />    (no sé como se llama)
            <MainLayout />
        )
    },
Supongo que sería así como los otros, deberíamos hacer 3 vistas distintas según el figma

* Path de Compra finalizada:
    {
        path: "/success",
        element: (
            <MainLayout>
                <Purchase />    (no sé como se llama)
            <MainLayout />
        )
    },
También, supongo que sería asi

* Path para registrarse:
    {
        path: "/register",
        element: (
            <MainLayout>
                <Register />    (no sé como se llama)
            <MainLayout />
        )
    },

* Path de Sobre Nosotros:
    {
        path: "/about",
        element: (
            <MainLayout>
                <About />    (no sé como se llama)
            <MainLayout />
        )
    },

* Path para agregar un admin(?)
    {
        path: "/registerAdmin",
        element: (
            <Protected>
                <MainLayout>
                    <RegisterAdmin />    (no sé como se llama)
                <MainLayout />
            <Protected />
        )
    },
Tampoco sé si seria desde un path distinto o si tendriamos el rol de usuario en el context, y a la hora de registrar mostrar la opción de registrar admin.
Si lo usamos así, tendriamos el componente de Protected que chequea el rol de usuario, si no es admin devuelve a otro path (por ejemplo al login e indica que inicie sesión como admin)
*/
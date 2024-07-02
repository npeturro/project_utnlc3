import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from "./components/login/Login";
import Cart from './components/cart/Cart';
import MainLayout from './components/layout/mainLayout/MainLayout';
import NotFound from './components/notFound/NotFound';
import Index from './components/index/Index';
import ProductCrud from './components/productCrud/ProductCrud';
import About from './components/about/About';
import UserCrud from './components/userCrud/userCrud';
import Checkout from './components/checkout/Checkout';
import ProductsByCategory from "./components/productsByCategory/ProductsByCategory";
import { UserProvider } from './contexts/user-context';
import { CartProvider } from './contexts/cart-context';
import { CartelProvider } from './contexts/alert-context';
import ProductView from './components/productView/ProductView';
import Register from './components/register/Register';
import AllProducts from './components/allProducts/AllProducts';
import Order from './components/order/Order';
import MyAccount from './components/account/MyAccount';
import AllOrders from './components/allOrders/AllOrders';
import Protected from './components/routes/Protected/Protected';
import ProtectedAdm from './components/routes/Protected/ProtectedAdm';
import ProtectedSup from './components/routes/Protected/ProtectedSup';


const App = () => {

    const router = createBrowserRouter([
        {
            path: "/login",
            element: (
                <MainLayout>
                    <Login />
                </MainLayout>
            )
        },
        {
            path: "/register",
            element: (
                <MainLayout>
                    <Register />
                </MainLayout>
            )
        },
        {
            path: "/cart",
            element: (
                <MainLayout>
                    <Cart />
                </MainLayout>
            )
        },
        {
            path: "/",
            element: (
                <MainLayout>
                    <Index />
                </MainLayout>
            )
        },
        {
            path: "/product",
            element: (
                <ProtectedAdm>
                    <MainLayout>
                        <ProductCrud />
                    </MainLayout>
                </ProtectedAdm>
            )
        },
        {
            path: "/products",
            element: (
                <MainLayout>
                    <AllProducts />
                </MainLayout>
            )
        },
        {
            path: "/checkout",
            element: (
                <MainLayout>
                    <Checkout />
                </MainLayout>
            )
        },
        {
            path: "/users",
            element: (
                <ProtectedSup>
                    <MainLayout>
                        <UserCrud />
                    </MainLayout>
                </ProtectedSup>
            )
        },
        {
            path: "/about",
            element: (
                <MainLayout>
                    <About />
                </MainLayout>
            )
        },
        {
            path: "/products/:category",
            element: (
                <MainLayout>
                    <ProductsByCategory />
                </MainLayout>
            )
        },
        {
            path: "/productView/:id",
            element: (
                <MainLayout>
                    <ProductView />
                </MainLayout>
            )
        },
        {
            path: "/order",
            element: (
                <MainLayout>
                    <Order />
                </MainLayout>
            )
        },
        {
            path: "/account",
            element: (
                <Protected>
                    <MainLayout>
                        <MyAccount />
                    </MainLayout>
                </Protected>
            )
        },
        {
            path: "/orders",
            element: (
                <ProtectedAdm>
                    <MainLayout>
                        <AllOrders />
                    </MainLayout>
                </ProtectedAdm>
            )
        },
        {
            path: "*",
            element: (
                <MainLayout>
                    <NotFound />
                </MainLayout>
            )
        },

    ]);

    return (
        <div>
            <CartelProvider>
                <UserProvider>
                    <CartProvider>
                        {<RouterProvider router={router} />}
                    </CartProvider>
                </UserProvider>
            </CartelProvider>
        </div>
    )

};

export default App;
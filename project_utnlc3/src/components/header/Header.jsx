import './Header.css';
import Logo from '../logo/logo';
import SearchBar from '../searchBar/SearchBar';
import Login from '../login/Login';
import CartIcon from '../cartIcon/CartIcon';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <SearchBar />
      <Login />
      <CartIcon />
    </header>
  );
};

export default Header;
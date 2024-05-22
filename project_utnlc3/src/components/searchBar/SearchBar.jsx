import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';


const SearchBar = () => {
    return (
        <div className="search-bar">
          <input type="text" placeholder="Buscar productos..." className="search-input" />
          <button className="search-button">
          <FaSearch className="search-icon" />
          </button>
        </div>
      );
    };
    
    export default SearchBar;


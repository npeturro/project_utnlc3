import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar "
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchBar;
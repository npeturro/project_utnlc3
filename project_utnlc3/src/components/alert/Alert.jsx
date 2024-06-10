import PropTypes from 'prop-types';

const Alert = ({ message, type, onClose }) => {
  if (!message) return null;

  const alertClass = type === 'error' ? 'danger' : type;

  return (
    <div className={`alert alert-${alertClass} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;

import PropTypes from 'prop-types';

const UserForm = ({
    
  nombre, setNombre,
  clave, setClave,
  apellido, setApellido,
  email, setEmail,
  phone, setPhone, 
  address, setAddress, 
  role, setRole,
  isActive, setIsActive,
  userId, handleSubmit, resetForm
}) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre completo"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rol"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Activo"
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-success me-2">{userId ? 'Actualizar' : 'Añadir'}</button>
      {userId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancelar</button>}
    </form>
  );
};

UserForm.propTypes = {
  nombre: PropTypes.string.isRequired,
  setNombre: PropTypes.func.isRequired,
  clave: PropTypes.isRequired,
  setClave: PropTypes.func.isRequired,
  apellido: PropTypes.string.isRequired,
  setApellido: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  setPhone: PropTypes.func.isRequired, 
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  isActive: PropTypes.string.isRequired,
  setIsActive: PropTypes.func.isRequired,
  userId: PropTypes.number,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default UserForm;

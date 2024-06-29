import PropTypes from 'prop-types';

const UserList = ({ usuarios, handleEdit, handleDelete }) => {
    return (
        <ul className="list-group mb-4">
            {usuarios.map(usuario => (
                <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{usuario.username}</strong> - {usuario.email} <br />
                        <small>{usuario.role}</small>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(usuario)}>Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

UserList.propTypes = {
    usuarios: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.number.isRequired,
        fullName: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        role: PropTypes.string,
        isActive: PropTypes.string
    })).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default UserList;


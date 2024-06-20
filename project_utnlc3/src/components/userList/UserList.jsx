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
        Id: PropTypes.number.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.number.isRequired,
        FullName: PropTypes.string,
        Email: PropTypes.string,
        Phone: PropTypes.string,
        Address: PropTypes.string,
        Role: PropTypes.string,
        IsActive: PropTypes.string
    })).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default UserList;


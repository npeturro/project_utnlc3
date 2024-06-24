import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from '../userList/UserList';
import UserForm from '../userForm/UserForm';
import SearchBar from '../searchBar/SearchBar';
import Alert from '../alert/Alert';
import { CartelContext } from '../../contexts/alert-context';

const UserCrud = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [isActive, setIsActive] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const cartel = useContext(CartelContext)

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    axios.get('http://onetechapi-utn.ddns.net/api/users')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevoUsuario = { username: nombre, password: clave, fullName: apellido, email: email, phone: phone, address: address, role: role, isActive: isActive };

    if (userId) {
      axios.put(`http://onetechapi-utn.ddns.net/api/users/${userId}`, nuevoUsuario)
        .then(() => {
          cargarUsuarios();
          resetForm();
          cartel({
            tipo: 'success',
            text: 'Usuario actualizado correctamente!'
          })
        })
        .catch(error => cartel({
          tipo: 'error',
          text: 'Error al actualizar usuario'
        }));
    } else {
      axios.post('http://onetechapi-utn.ddns.net/api/users', nuevoUsuario)
        .then(response => {
          setUsuarios([...usuarios, response.data]);
          cartel({
            tipo: 'success',
            text: 'Usuario ingresado correctamente!'
          })
          resetForm();
        })
        .catch(error => cartel({
          tipo: 'error',
          text: 'Error al ingresar usuario'
        }));
    }
  };

  const resetForm = () => {
    setNombre('');
    setClave('');
    setApellido('');
    setEmail('');
    setUserId(null);
    setPhone('');
    setAddress('');
    setRole('');
    setIsActive('');
  };

  const handleEdit = (usuario) => {
    setNombre(usuario.username);
    setClave(usuario.password);
    setApellido(usuario.fullName);
    setEmail(usuario.email);
    setUserId(usuario.id);
    setPhone(usuario.phone);
    setAddress(usuario.address);
    setRole(usuario.role);
    setIsActive(usuario.isActive);
  };

  const handleDelete = (id) => {
    axios.delete(`http://onetechapi-utn.ddns.net/api/users/${id}`)
      .then(() => {
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        cartel({
          tipo: 'success',
          text: 'Usuario eliminado correctamente!'
        })
      })
      .catch(error => cartel({
        tipo: 'error',
        text: 'Error al eliminar usuario'
      }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Usuarios</h1>
      {alert.message && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />
      )}
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <UserList usuarios={filteredUsuarios} handleEdit={handleEdit} handleDelete={handleDelete} />
      <h2 className="mb-4">{userId ? 'Editar Usuario' : 'Añadir Usuario'}</h2>
      <UserForm
        nombre={nombre} setNombre={setNombre}
        clave={clave} setClave={setClave}
        apellido={apellido} setApellido={setApellido}
        email={email} setEmail={setEmail}
        phone={phone} setPhone={setPhone}
        address={address} setAddress={setAddress}
        role={role} setRole={setRole}
        isActive={isActive} setIsActive={setIsActive}
        userId={userId}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </div>
  );
};

export default UserCrud;

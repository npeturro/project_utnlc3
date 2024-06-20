import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from '../productList/ProductList';
import ProductForm from '../productForm/ProductForm';
import SearchBar from '../searchBar/SearchBar';
import Alert from '../alert/Alert';

const ProductCrud = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState(''); // Añadir campo de categoría
  const [productoId, setProductoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    axios.get('https://localhost:7088/api/productos')
      .then(response => {
        setProductos(response.data);
        setAlert({ message: 'Productos cargados correctamente', type: 'success' });
      })
      .catch(error => setAlert({ message: 'Error al cargar los productos', type: 'error' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevoProducto = {
      name: nombre,
      description: descripcion,
      image: imagen,
      price: parseFloat(precio),
      category: categoria // Añadir campo de categoría
    };

    if (productoId) {
      axios.put(`https://localhost:7088/api/productos/${productoId}`, nuevoProducto)
        .then(() => {
          cargarProductos();
          resetForm();
          setAlert({ message: 'Producto actualizado correctamente', type: 'success' });
        })
        .catch(error => setAlert({ message: 'Error al actualizar el producto', type: 'error' }));
    } else {
      axios.post('https://localhost:7088/api/productos', nuevoProducto)
        .then(response => {
          setProductos([...productos, response.data]);
          resetForm();
          setAlert({ message: 'Producto creado correctamente', type: 'success' });
        })
        .catch(error => setAlert({ message: 'Error al crear el producto', type: 'error' }));
    }
  };

  const resetForm = () => {
    setNombre('');
    setPrecio('');
    setImagen('');
    setDescripcion('');
    setCategoria(''); // Resetear campo de categoría
    setProductoId(null);
  };

  const handleEdit = (producto) => {
    setNombre(producto.name);
    setPrecio(producto.price);
    setImagen(producto.image);
    setDescripcion(producto.description);
    setCategoria(producto.category); // Editar campo de categoría
    setProductoId(producto.id);
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:7088/api/productos/${id}`)
      .then(() => {
        setProductos(productos.filter(producto => producto.id !== id));
        setAlert({ message: 'Producto eliminado correctamente', type: 'success' });
      })
      .catch(error => setAlert({ message: 'Error al eliminar el producto', type: 'error' }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProductos = productos.filter(producto =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Productos</h1>
      {alert.message && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />
      )}
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <ProductList productos={filteredProductos} handleEdit={handleEdit} handleDelete={handleDelete} />
      <h2 className="mb-4">{productoId ? 'Editar Producto' : 'Añadir Producto'}</h2>
      <ProductForm
        nombre={nombre} setNombre={setNombre}
        precio={precio} setPrecio={setPrecio}
        imagen={imagen} setImagen={setImagen}
        descripcion={descripcion} setDescripcion={setDescripcion}
        categoria={categoria} setCategoria={setCategoria} // Añadir campo de categoría
        productoId={productoId}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </div>
  );
};

export default ProductCrud;

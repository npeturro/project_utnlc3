import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "../productList/ProductList";
import ProductForm from "../productForm/ProductForm";
import SearchBar from "../searchBar/SearchBar";
import Alert from "../alert/Alert";

const ProductCrud = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    descripcion: "",
    categoria: "",
    stock: "",
    id: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await axios.get(
        "http://onetechapi-utn.ddns.net/api/productos"
      );
      setProductos(response.data);
      setAlert({
        message: "Productos cargados correctamente",
        type: "success",
      });
    } catch (error) {
      setAlert({ message: "Error al cargar los productos", type: "error" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nuevoProducto = {
      name: producto.nombre,
      description: producto.descripcion,
      image: producto.imagen,
      price: parseInt(producto.precio),
      category: producto.categoria,
      stock: parseInt(producto.stock),
    };

    try {
      if (producto.id) {
        await axios.put(
          `http://onetechapi-utn.ddns.net/api/productos/${producto.id}`,
          nuevoProducto
        );
        setAlert({
          message: "Producto actualizado correctamente",
          type: "success",
        });
      } else {
        const response = await axios.post(
          "http://onetechapi-utn.ddns.net/api/productos",
          nuevoProducto
        );
        setProductos([...productos, response.data]);
        setAlert({ message: "Producto creado correctamente", type: "success" });
      }
      cargarProductos();
      resetForm();
    } catch (error) {
      setAlert({
        message: `Error al ${producto.id ? "actualizar" : "crear"} el producto`,
        type: "error",
      });
    }
  };

  const resetForm = () => {
    setProducto({
      nombre: "",
      precio: "",
      imagen: "",
      descripcion: "",
      categoria: "",
      stock: "",
      id: null,
    });
  };

  const handleEdit = (producto) => {
    setProducto({
      nombre: producto.name,
      precio: producto.price,
      imagen: producto.image,
      descripcion: producto.description,
      categoria: producto.category,
      stock: producto.stock,
      id: producto.id,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://onetechapi-utn.ddns.net/api/productos/${id}`);
      setProductos(productos.filter((producto) => producto.id !== id));
      setAlert({
        message: "Producto eliminado correctamente",
        type: "success",
      });
    } catch (error) {
      setAlert({ message: "Error al eliminar el producto", type: "error" });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProductos = productos.filter((producto) =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Lista de Productos</h1>
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <ProductList
        productos={filteredProductos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <h2 className="mb-4">
        {producto.id ? "Editar Producto" : "Añadir Producto"}
      </h2>
      <ProductForm
        nombre={producto.nombre}
        setNombre={(value) => setProducto({ ...producto, nombre: value })}
        precio={producto.precio}
        setPrecio={(value) => setProducto({ ...producto, precio: value })}
        imagen={producto.imagen}
        setImagen={(value) => setProducto({ ...producto, imagen: value })}
        descripcion={producto.descripcion}
        setDescripcion={(value) =>
          setProducto({ ...producto, descripcion: value })
        }
        categoria={producto.categoria}
        setCategoria={(value) => setProducto({ ...producto, categoria: value })}
        stock={producto.stock}
        setStock={(value) => setProducto({ ...producto, stock: value })}
        productoId={producto.id}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </div>
  );
};

export default ProductCrud;

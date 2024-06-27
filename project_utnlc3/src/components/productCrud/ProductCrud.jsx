import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "../productList/ProductList";
import ProductForm from "../productForm/ProductForm";
import SearchBar from "../searchBar/SearchBar";
import Alert from "../alert/Alert";
import { CartelContext } from "../../contexts/alert-context";
import { UserContext } from "../../contexts/user-context";
import NotFound from "../notFound/NotFound";
import { Stack, Box, Container } from "@mui/material";

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
  const cartel = useContext(CartelContext)

  const { userLoged, setUserLoged } = useContext(UserContext);


  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await axios.get(
        "http://onetechapi-utn.ddns.net/api/productos"
      );
      setProductos(response.data);
    } catch (error) {
      console.log(error)
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
        cartel({
          tipo: 'success',
          text: 'Producto actualizado correctamente!'
        })
      } else {
        const response = await axios.post(
          "http://onetechapi-utn.ddns.net/api/productos",
          nuevoProducto
        );
        setProductos([...productos, response.data]);
        cartel({
          tipo: 'success',
          text: 'Producto creado correctamente!'
        })
      }
      cargarProductos();
      resetForm();
    } catch (error) {
      cartel({
        tipo: 'error',
        text: `Error al ${producto.id ? "actualizar" : "crear"} el producto`
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
      cartel({
        tipo: 'success',
        text: 'Producto eliminado correctamente!'
      })
    } catch (error) {
      cartel({
        tipo: 'error',
        text: `Error al eliminar el producto`
      });
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProductos = productos.filter((producto) =>
    producto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: "1%", mb: "3%" }}>
        <Stack spacing={1}>
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
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductCrud;

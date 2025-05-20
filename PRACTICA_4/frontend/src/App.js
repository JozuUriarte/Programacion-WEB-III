import './App.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaTrash, FaEdit } from 'react-icons/fa';

function App() {
  const [productos, setProductos] = useState([]);
  const [formularioAgregar, setAgregarProducto] = useState({
    nombreProducto: '', marca: '', precio: '', talla: ''
  });
  const [formularioEditar, setEditarProducto] = useState({
    nombreProducto: '', marca: '', precio: '', talla: ''
  });
  const [productoId, setProductoId] = useState(null);
  const [show, setShow] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cerrarModal = () => setMostrar(false);
  const abrirModal = () => setMostrar(true);

  const fetchProductos = useCallback(async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/productos');
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      alert('ERROR ' + error);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const agregar = async (e) => {
    e.preventDefault();
    if (!formularioAgregar.nombreProducto.trim()) {
      alert('Nombre requerido');
      return;
    }
    try {
      const respuesta = await fetch('http://localhost:3001/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formularioAgregar)
      });

      if (!respuesta.ok) {
        throw new Error('Error al cargar');
      }

      handleClose();
      Swal.fire({ title: "Producto agregado", icon: "success", timer: 2000 });
      fetchProductos();
    } catch (error) {
      console.error(error);
      Swal.fire({ title: "Error al agregar", icon: "error", timer: 2000 });
    }
  };

  const cambiosFormularioAgregar = (e) => {
    setAgregarProducto({
      ...formularioAgregar,
      [e.target.name]: e.target.value
    });
  };

  const editarProductos = (producto) => {
    setEditarProducto({
      nombreProducto: producto.nombreProducto,
      marca: producto.marca,
      precio: producto.precio,
      talla: producto.talla
    });
    setProductoId(producto.id);
    abrirModal();
  };

  const cambiosFormularioEditar = (e) => {
    setEditarProducto({
      ...formularioEditar,
      [e.target.name]: e.target.value
    });
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(`http://localhost:3001/api/productos/${productoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formularioEditar)
      });

      if (!respuesta.ok) {
        throw new Error('Error al editar');
      }

      cerrarModal();
      Swal.fire({ title: "Producto editado", icon: "success", timer: 2000 });
      fetchProductos();
    } catch (error) {
      console.error(error);
      Swal.fire({ title: "Error al editar", icon: "error", timer: 2000 });
    }
  };

  const eliminarProducto = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await fetch(`http://localhost:3001/api/productos/${id}`, {
            method: 'DELETE'
          });

          if (!respuesta.ok) {
            throw new Error('No se pudo eliminar');
          }

          Swal.fire({ title: "Eliminado", icon: "success", timer: 2000 });
          fetchProductos();
        } catch (error) {
          Swal.fire({ title: "Error al eliminar", icon: "error", timer: 2000 });
        }
      }
    });
  };

  return (
    <div className="contenedor p-4">
      <Button variant="primary" onClick={handleShow}>Crear</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>MARCA</th>
            <th>PRECIO</th>
            <th>TALLA</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombreProducto}</td>
              <td>{producto.marca}</td>
              <td>{producto.precio}</td>
              <td>{producto.talla}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => editarProductos(producto)} className="me-2">
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => eliminarProducto(producto.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Crear */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear nuevo registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombreProducto"
                type="text"
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.nombreProducto}
              />
              <Form.Label>Marca</Form.Label>
              <Form.Control
                name="marca"
                type="text"
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.marca}
              />
              <Form.Label>Precio</Form.Label>
              <Form.Control
                name="precio"
                type="number"
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.precio}
              />
              <Form.Label>Talla</Form.Label>
              <Form.Control
                name="talla"
                type="text"
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.talla}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="primary" onClick={agregar}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Editar */}
      <Modal show={mostrar} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name='nombreProducto'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.nombreProducto}
              />
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name='marca'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.marca}
              />
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name='precio'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.precio}
              />
              <Form.Label>Talla</Form.Label>
              <Form.Control
                type="text"
                name='talla'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.talla}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>Cerrar</Button>
          <Button variant="primary" onClick={editarProducto}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

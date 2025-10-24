import { useState, useEffect } from 'react';
import api from './servicios/api';
import Swal from 'sweetalert2';

function AdministracionProductos() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState('');
    const [esModalVisible, setEsModalVisible] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    
    
    const fetchProductos = async () => {
        try {
            const respuesta = await api.get('/producto/get');
            setProductos(respuesta.data);
        } catch (err) {
            console.error("Error al obtener los productos:", err);
            setError('No se pudieron cargar los productos.');
        }
    };
        
    useEffect(() => {
        fetchProductos();
    }, []);

    const manejarEliminar = async (id) => {
        const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
        });

        if (!confirmacion.isConfirmed) {
        return; // Si el usuario cancela, no hacemos nada.
        }

        try {
        await api.delete(`/producto/delete/${id}`);
        setProductos(productos.filter(producto => producto.id !== id));
        } catch (err) {
        console.error("Error al eliminar el producto:", err);
        setError('No se pudo eliminar el producto.');
        }
    };

    const abrirModalParaCrear = () => {
        setProductoSeleccionado({ 
            nombre: '',
            descripcion: '', 
            precio: 0,
            imagenUrl: ''
        });
        setEsModalVisible(true);
    }
    const abrirModalParaEditar = (producto) => {
        setProductoSeleccionado(producto);
        setEsModalVisible(true);
    }

    const manejarCambioFormulario = (e) => {
        const { name, value } = e.target;
        setProductoSeleccionado(prev => ({...prev,[name]: value}));
    } 

    const manejarGuardar = async (e) => {
        e.preventDefault(); 
        let respuesta;

        try {
        if (productoSeleccionado.id) {
            respuesta = await api.put(`/producto/put/${productoSeleccionado.id}`, productoSeleccionado);
            await api.put(`/producto/put/${productoSeleccionado.id}`, productoSeleccionado);
        } else {
            respuesta = await api.post('/producto/post', productoSeleccionado);
        }
        setEsModalVisible(false);
        Swal.fire('Éxito', 'Producto guardado correctamente.', 'success');
        fetchProductos();
        } catch (err) {
        console.error("Error al guardar el producto:", err);
        setError('No se pudo guardar el producto.');
        Swal.fire('Error', 'No se pudo guardar el producto.', 'error');
        }
    }
  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-amber-900">Gestionar Productos</h2>
            <button onClick={abrirModalParaCrear} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
            + Añadir Producto
            </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-amber-800 uppercase bg-amber-50">
                <tr>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Descripción</th>
                <th scope="col" className="px-6 py-3">Precio</th>
                <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                <tr key={producto.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{producto.nombre}</td>
                    <td className="px-6 py-4">{producto.descripcion}</td>
                    <td className="px-6 py-4">Q{producto.precio.toFixed(2)}</td>
                    <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => abrirModalParaEditar(producto)} className="font-medium text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => manejarEliminar(producto.id)} className="font-medium text-red-600 hover:underline">Eliminar</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {esModalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h3 className="text-lg font-bold mb-4">{productoSeleccionado && productoSeleccionado.id ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h3>
                    
                    {/* Se envuelve todo en un solo formulario con su onSubmit */}
                    <form onSubmit={manejarGuardar}>
                        {productoSeleccionado && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-1">Nombre</label>
                                    <input type="text" name="nombre" value={productoSeleccionado.nombre} onChange={manejarCambioFormulario} className="w-full p-2 border rounded-lg" required />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-1">Descripción</label>
                                    <textarea name="descripcion" value={productoSeleccionado.descripcion} onChange={manejarCambioFormulario} className="w-full p-2 border rounded-lg"></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-1">Precio</label>
                                    <input type="number" name="precio" value={productoSeleccionado.precio} onChange={manejarCambioFormulario} className="w-full p-2 border rounded-lg" required step="0.01" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold mb-1">URL de la Imagen</label>
                                    <input type="text" name="imagenUrl" value={productoSeleccionado.imagenUrl} onChange={manejarCambioFormulario} className="w-full p-2 border rounded-lg" />
                                </div>
                            </>
                        )}
                        {/* Se unifican los botones dentro del formulario */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button type="button" onClick={() => setEsModalVisible(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancelar</button>
                            <button type="submit" className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
}

export default AdministracionProductos;


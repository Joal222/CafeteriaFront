import { useState, useEffect } from 'react';
import api from './servicios/api'; // Usamos nuestro servicio de API centralizado
import './app-css/catalogo.css';

function Catalogo({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await api.get('/producto/get', {
          params: {busqueda: terminoBusqueda}
        });
        setProductos(respuesta.data);
        setError('');
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
      }
    };
    const delayDebounce = setTimeout(() => {
      fetchProductos();
    }, 300); 
    return () => clearTimeout(delayDebounce); 
  }, [terminoBusqueda]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-center items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-amber-900">Nuestro Menú</h2>
        {/* Input para la búsqueda */}
        <input 
          type="text"
          placeholder="Buscar café, postre..."
          className="w-full sm:w-64 p-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          value={terminoBusqueda}
          // Cada vez que el usuario escribe, actualizamos el estado 'terminoBusqueda'
          onChange={(e) => setTerminoBusqueda(e.target.value)} 
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {/* Grid para mostrar los productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img 
              className="w-full h-48 object-cover" 
              src={producto.imagenUrl || 'https://placehold.co/600x400/FFF0DB/333?text=Café'} 
              alt={producto.nombre} 
            />
            <div className="p-4">
              <h3 className="producto-titulo text-xl font-semibold">{producto.nombre}</h3>
              <p className="text-gray-600 mt-2 text-sm">{producto.descripcion}</p>
              <p className="producto-precio text-lg font-bold text-amber-900 mt-4">Q{producto.precio.toFixed(2)}</p>
              <div className="mt-4">
                <button 
                  onClick={() => agregarAlCarrito(producto)} // Llama a la función al hacer clic
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {productos.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-8">
          No se encontraron productos que coincidan con tu búsqueda.
        </p>
      )}
    </div>
  );
}

export default Catalogo;

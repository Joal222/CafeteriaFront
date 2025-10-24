    import React from 'react';

    // Recibe las nuevas props: actualizarCantidad, eliminarDelCarrito
    function VistaCarrito({ carrito, cambiarVista, procederAlPago, actualizarCantidad, eliminarDelCarrito }) {
      
      // Cálculo del total usando la nueva estructura
      const total = carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0);

      return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto"> {/* Ampliamos el max-width */}
          <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center sm:text-left">
            Tu Pedido (Recoger en Tienda)
          </h2>
          
          {carrito.length === 0 ? (
            <div className="text-center bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
              <button 
                onClick={() => cambiarVista('catalogo')} 
                className="text-amber-600 hover:text-amber-800 font-bold py-2 px-4 rounded transition duration-300">
                Ir al Menú
              </button>
            </div>
          ) : (
            // Usamos flexbox para dividir en dos columnas en pantallas grandes
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Columna Izquierda: Lista de Productos */}
              <div className="lg:w-2/3 space-y-4">
                {carrito.map((item) => (
                  <div key={item.producto.id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                    {/* Imagen del Producto */}
                    <img 
                      src={item.producto.imagenUrl || 'https://placehold.co/100x100/FFF0DB/333?text=Café'} 
                      alt={item.producto.nombre}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0" 
                    />
                    {/* Detalles del Producto */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-amber-800">{item.producto.nombre}</h3>
                      <p className="text-sm text-gray-500">Q{(item.producto.precio || 0).toFixed(2)} c/u</p>
                    </div>
                    {/* Controles de Cantidad y Subtotal */}
                    <div className="flex items-center gap-2">
                       <input 
                         type="number" 
                         min="1" 
                         value={item.cantidad} 
                         onChange={(e) => actualizarCantidad(item.producto.id, e.target.value)}
                         className="w-16 p-1 border rounded text-center"
                       />
                       <p className="font-semibold w-20 text-right">
                         Q{(item.producto.precio * item.cantidad).toFixed(2)}
                       </p>
                    </div>
                    {/* Botón Eliminar */}
                    <button 
                      onClick={() => eliminarDelCarrito(item.producto.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full ml-2"
                      title="Eliminar del carrito">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Columna Derecha: Resumen y Botón de Pago */}
              <div className="lg:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow sticky top-6"> {/* Hacemos que el resumen sea 'sticky' */}
                  <h3 className="text-xl font-bold text-amber-900 mb-4 border-b pb-2">Resumen del Pedido</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal ({carrito.length} items):</span>
                    <span className="font-semibold">Q{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Descuento:</span>
                    <span className="font-semibold">Q 0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
                    <span>Total a Pagar:</span>
                    <span>Q{total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={procederAlPago} 
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    Pagar con Tarjeta (Simulado)
                  </button>
                  <button 
                    onClick={() => cambiarVista('catalogo')} 
                    className="mt-4 text-sm text-center w-full text-amber-600 hover:text-amber-800 transition duration-300">
                    &larr; Seguir comprando
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default VistaCarrito;
    


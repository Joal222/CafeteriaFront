// --- (AÑADIDO) ---
// Importamos 'useState' para manejar el estado del menú móvil
import React, { useState } from 'react';

// --- (ICONO CARRITO - SIN CAMBIOS) ---
const IconoCarrito = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

// --- (AÑADIDOS) ---
// Icono para el menú hamburguesa (☰)
const IconoMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
// Icono para cerrar (X)
const IconoCerrar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
// --- (FIN DE ICONOS AÑADIDOS) ---


function Header({ usuario, manejarLogout, cambiarVista, cantidadCarrito }) {
  const esAdmin = usuario && usuario.roles && usuario.roles.includes('Administrador');

  // --- (AÑADIDO) ---
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [esMenuMovilAbierto, setEsMenuMovilAbierto] = useState(false);
  // --- (FIN DE ESTADO AÑADIDO) ---

  const handleNavClick = (sectionId) => {
    cambiarVista('catalogo'); 
    
    // --- (AÑADIDO) ---
    // Cierra el menú móvil cada vez que seleccionamos una opción
    setEsMenuMovilAbierto(false); 
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`No se encontró el elemento con id: ${sectionId}`);
      }
    }, 100);
  };

  return (
    // --- (MODIFICADO) ---
    // Añadimos 'relative' para que el menú desplegable se posicione correctamente
    <header className="bg-white shadow-md sticky top-0 z-40 relative">
      
      <nav className="w-full max-w-6xl mx-auto p-4 flex justify-between items-center">
        
        <button
          onClick={() => handleNavClick('menu')} 
          className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300"
        >
          Cafetería del Aroma
        </button>

        {/* --- (ESTO ES PARA ESCRITORIO - SIN CAMBIOS) --- */}
        {/* Sigue oculto en móvil (hidden) y visible en desktop (md:flex) */}
        <div className="hidden md:flex gap-6">
          <button onClick={() => handleNavClick('menu')} className="text-gray-500 hover:text-gray-900 font-medium transition duration-300">Menú</button>
          <button onClick={() => handleNavClick('quienesSomos')} className="text-gray-500 hover:text-gray-900 font-medium transition duration-300">Quiénes Somos</button>
          <button onClick={() => handleNavClick('contacto')} className="text-gray-500 hover:text-gray-900 font-medium transition duration-300">Contacto</button>
        </div>

        {/* --- (MODIFICADO) --- */}
        {/* Ahora agrupamos los botones de la derecha */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Botones de usuario (Carrito, Admin, Salir) - Sin cambios */}
          <button onClick={() => cambiarVista('carrito')} className="relative p-2 hover:bg-gray-100 rounded-full transition duration-300">
            <IconoCarrito /> 
            {cantidadCarrito > 0 && (
                <span className="absolute -top-1 -right-1 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    {cantidadCarrito}
                </span>
            )}
          </button>
          {esAdmin && (
            <button onClick={() => cambiarVista('admin')} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded-lg text-sm transition duration-300">
              Admin
            </button>
          )}
          <button
            onClick={manejarLogout}
            className="bg-transparent border border-gray-700 hover:bg-gray-700 hover:text-white text-gray-700 font-bold py-2 px-3 rounded-lg text-sm transition duration-300">
            Salir
          </button>

          {/* --- (AÑADIDO) --- */}
          {/* Botón de Menú Hamburguesa (SOLO visible en móvil 'md:hidden') */}
          <button 
            onClick={() => setEsMenuMovilAbierto(!esMenuMovilAbierto)} 
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition duration-300"
          >
            {/* Cambia el icono si está abierto (X) o cerrado (☰) */}
            {esMenuMovilAbierto ? <IconoCerrar /> : <IconoMenu />}
          </button>
          {/* --- (FIN DE BOTÓN AÑADIDO) --- */}

        </div>
      </nav>

      {/* --- (AÑADIDO) --- */}
      {/* Menú Desplegable Móvil */}
      {/* Se muestra solo si esMenuMovilAbierto es true Y estamos en móvil (md:hidden) */}
      {esMenuMovilAbierto && (
        <div className="md:hidden absolute w-full bg-white shadow-lg left-0 border-t border-gray-100">
          <button onClick={() => handleNavClick('menu')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-300">Menú</button>
          <button onClick={() => handleNavClick('quienesSomos')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-300">Quiénes Somos</button>
          <button onClick={() => handleNavClick('contacto')} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-300">Contacto</button>
        </div>
      )}
      {/* --- (FIN DE MENÚ MÓVIL AÑADIDO) --- */}

    </header>
  );
}

export default Header;
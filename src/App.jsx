import { useState, useEffect } from 'react';
import api from './servicios/api';
import Catalogo from './Catalogo';
import AdministracionProductos from './AdministracionProductos';
import Swal from 'sweetalert2';
import VistaCarrito from './VistaCarrito';

// --- Componentes (FormularioLogin, FormularioRegistro, NavegacionUsuario sin cambios) ---
function FormularioLogin({ cambiarModo, manejarCambio, datosFormulario, manejarSubmit }) {
  // Asegúrate de que los campos 'email' y 'password' existan en datosFormulario
  return (
    <>
      <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">¡Bienvenido!</h2>
      <form onSubmit={manejarSubmit}>
        <div className="mb-4">
          <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500"
            id="email"
            type="email"
            placeholder="tu@correo.com"
            name="email"
            value={datosFormulario.email || ''} // Añadido || '' por seguridad
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500"
            id="password"
            type="password"
            placeholder="******************"
            name="password"
            value={datosFormulario.password || ''} // Añadido || '' por seguridad
            onChange={manejarCambio}
            required
          />
          <a className="inline-block align-baseline font-bold text-sm text-amber-600 hover:text-amber-800" href="#">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full"
            type="submit">
            Iniciar Sesión
          </button>
        </div>
        <p className="text-center text-gray-600 text-sm mt-6">
          ¿No tienes una cuenta?{' '}
          <button type="button" onClick={cambiarModo} className="font-bold text-amber-600 hover:text-amber-800">
            Regístrate aquí
          </button>
        </p>
      </form>
    </>
  );
}

function FormularioRegistro({ cambiarModo, manejarCambio, datosFormulario, manejarSubmit }) {
   // Asegúrate de que los campos 'nombreCompleto', 'email' y 'password' existan
  return (
    <>
      <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Crea tu Cuenta</h2>
      <form onSubmit={manejarSubmit}>
       <div className="mb-4">
          <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="nombreCompleto">
            Nombre Completo
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500"
            id="nombreCompleto"
            type="text"
            placeholder="Tu Nombre"
            name="nombreCompleto"
            value={datosFormulario.nombreCompleto || ''} // Añadido || '' por seguridad
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500"
            id="email"
            type="email"
            placeholder="tu@correo.com"
            name="email"
            value={datosFormulario.email || ''} // Añadido || '' por seguridad
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-amber-800 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500"
            id="password"
            type="password"
            placeholder="******************"
            name="password"
            value={datosFormulario.password || ''} // Añadido || '' por seguridad
            onChange={manejarCambio}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full"
            type="submit">
            Crear Cuenta
          </button>
        </div>
        <p className="text-center text-gray-600 text-sm mt-6">
          ¿Ya tienes una cuenta?{' '}
          <button type="button" onClick={cambiarModo} className="font-bold text-amber-600 hover:text-amber-800">
            Inicia sesión
          </button>
        </p>
      </form>
    </>
  );
}

function NavegacionUsuario({ usuario, manejarLogout, cambiarVista, cantidadCarrito }) {
  const esAdmin = usuario && usuario.roles && usuario.roles.includes('Administrador');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex justify-between items-center">
      <div>
        <button onClick={() => cambiarVista('catalogo')} className="text-2xl font-bold text-amber-900 hover:text-amber-700">
          Cafetería del Aroma
        </button>
      </div>
      <div className="flex items-center gap-4">
        {/* Botón Carrito */}
        <button onClick={() => cambiarVista('carrito')} className="relative p-2 hover:bg-amber-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          {cantidadCarrito > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {cantidadCarrito}
            </span>
          )}
        </button>
        {/* Botón Administrar (Condicional) */}
        {esAdmin && (
          <button onClick={() => cambiarVista('admin')} className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded-lg">
            Administrar
          </button>
        )}
        {/* Botón Cerrar Sesión */}
        <button
          onClick={manejarLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}


function App() {
  const [usuario, setUsuario] = useState(null);
  const [vistaActual, setVistaActual] = useState('catalogo');
  const [esLogin, setEsLogin] = useState(true);
  const [datosFormulario, setDatosFormulario] = useState({
    email: '',
    password: '',
    nombreCompleto: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [carrito, setCarrito] = useState([]);


  useEffect(() => {
    if (usuario) {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      localStorage.removeItem('carrito');
    }
  }, [carrito, usuario]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('usuario');
    if (token && userJson) {
      try {
        const usuarioCargado = JSON.parse(userJson);
        setUsuario(usuarioCargado);

        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
          try {
            setCarrito(JSON.parse(carritoGuardado));
          } catch (e) {
            console.error("Error al parsear carrito desde localStorage:", e);
            localStorage.removeItem('carrito');
          }
        }
      } catch (e) {
        console.error("Error al parsear usuario desde localStorage:", e);
        setUsuario(null);
        setCarrito([]);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('carrito');
      }
    }
  }, []);


  const cambiarVista = (vista) => {
    setVistaActual(vista);
  };

  const cambiarModo = () => {
    setEsLogin(!esLogin);
    setDatosFormulario({ email: '', password: '', nombreCompleto: '' });
    setMensaje('');
    setError('');
  };

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario(prevState => ({ ...prevState, [name]: value }));
  };

  const manejarLogout = () => {
    setUsuario(null);
    setCarrito([]);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('carrito');
    setEsLogin(true);
    setVistaActual('catalogo');
  };

  const manejarRegistroSubmit = async (evento) => {
    evento.preventDefault();
    setMensaje('');
    setError('');
    try {
      const respuesta = await api.post('/autenticacion/registrar', {
        nombreCompleto: datosFormulario.nombreCompleto,
        email: datosFormulario.email,
        password: datosFormulario.password,
      });
      setMensaje(respuesta.data.mensaje);
    } catch (err) {
      console.error("Error en el registro:", err.response?.data);
      const errorMsg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(' ')
        : err.response?.data?.Errores?.join(' ') || 'Ocurrió un error inesperado. Inténtalo de nuevo.';
      setError(errorMsg);
    }
  };

  const manejarLoginSubmit = async (evento) => {
    evento.preventDefault();
    setMensaje('');
    setError('');
    try {
      const respuesta = await api.post('/autenticacion/login', {
        email: datosFormulario.email,
        password: datosFormulario.password,
      });

      const datosUsuario = {
        email: respuesta.data.email,
        roles: respuesta.data.roles
      };

      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));

      setUsuario(datosUsuario);
      setVistaActual('catalogo');

    } catch (err) {
      console.error("Error en el login:", err.response?.data);
      setError(err.response?.data?.mensaje || 'Credenciales incorrectas o correo no confirmado.');
    }
  };

  const agregarAlCarrito = (producto) => {
    setCarrito(carritoActual => {
      const productoExistente = carritoActual.find(item => item.producto.id === producto.id);
      if (productoExistente) {
         Swal.fire({
            icon: 'info',
            title: `${producto.nombre} ya está en el carrito`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          });
          return carritoActual; // No changes if item exists
      } else {
        Swal.fire({
            icon: 'success', title: `${producto.nombre} añadido al carrito`, toast: true, position: 'top-end',
            showConfirmButton: false, timer: 1500, timerProgressBar: true
          });
         return [...carritoActual, { producto: producto, cantidad: 1 }];
      }
    });
  };


  const actualizarCantidad = (productoId, nuevaCantidad) => {
    const cantidad = Math.max(1, parseInt(nuevaCantidad) || 1);
    setCarrito(carritoActual =>
      carritoActual.map(item =>
        item.producto.id === productoId
          ? { ...item, cantidad: cantidad }
          : item
      )
    );
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carritoActual =>
      carritoActual.filter(item => item.producto.id !== productoId)
    );
    Swal.fire({
      icon: 'info', title: 'Producto eliminado', toast: true, position: 'top-end',
      showConfirmButton: false, timer: 1000
    });
  };

   const procederAlPago = async () => {
        const { value: formValues } = await Swal.fire({
          title: 'Simulación de Pago Seguro',
          html: `
            <input id="swal-input-nombre" class="swal2-input" placeholder="Nombre como aparece en la tarjeta">
            <input id="swal-input-numero" class="swal2-input" placeholder="Número de tarjeta (ficticio)">
            <input id="swal-input-cvv" class="swal2-input" placeholder="CVV (ficticio)" type="password" maxlength="3">
          `,
          focusConfirm: false,
          confirmButtonText: 'Pagar Ahora',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const nombre = document.getElementById('swal-input-nombre').value;
            const numero = document.getElementById('swal-input-numero').value;
            if (!nombre || !numero) {
              Swal.showValidationMessage(`Por favor, ingresa nombre y número de tarjeta`);
              return false;
            }
            return { nombre, numero };
          }
         }); // Correct closing parenthesis

        if (formValues) {
          Swal.fire({
            title: 'Procesando tu pago...',
            text: 'Esto tomará unos segundos.',
            timer: 3000,
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              Swal.fire(
                '¡Pago Realizado!',
                'Tu pedido está listo para recoger en tienda.',
                'success'
              );
              setCarrito([]);
              setVistaActual('catalogo');
            }
          });
        }
      };


  // --- Lógica de Renderizado Principal ---
  if (usuario) {
    return (
      <div className="min-h-screen bg-amber-50 font-sans">
        <header className="bg-white shadow-md">
          <NavegacionUsuario
            usuario={usuario}
            manejarLogout={manejarLogout}
            cambiarVista={cambiarVista}
            cantidadCarrito={carrito.length}
          />
        </header>
        <main>
          {vistaActual === 'catalogo' && <Catalogo agregarAlCarrito={agregarAlCarrito} />}
          {vistaActual === 'admin' && <AdministracionProductos />}
          {vistaActual === 'carrito' &&
            <VistaCarrito
              carrito={carrito}
              cambiarVista={cambiarVista}
              procederAlPago={procederAlPago}
              actualizarCantidad={actualizarCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        </main>
      </div>
    ); // Correct closing parenthesis for the logged-in user view
  } // Correct closing curly brace for the if (usuario) block

  // --- Vista de Autenticación ---
   return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-amber-900">Cafetería del Aroma</h1>
        <p className="text-amber-700 mt-2">Tu café favorito, a un clic de distancia.</p>
      </header>

      <main className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {mensaje && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{mensaje}</div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}

        {esLogin ? (
          <FormularioLogin
            cambiarModo={cambiarModo}
            manejarCambio={manejarCambio}
            datosFormulario={datosFormulario}
            manejarSubmit={manejarLoginSubmit}
          />
        ) : (
          <FormularioRegistro
            cambiarModo={cambiarModo}
            manejarCambio={manejarCambio}
            datosFormulario={datosFormulario}
            manejarSubmit={manejarRegistroSubmit}
          />
        )}
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy;2025 Cafetería del Aroma. Todos los derechos reservados.</p>
      </footer>
    </div>
   ); // Correct closing parenthesis for the non-logged-in user view
} // Correct closing curly brace for the App function

export default App;


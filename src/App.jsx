import { useState, useEffect } from 'react';
import api from './servicios/api';
import Swal from 'sweetalert2';

import Catalogo from './Catalogo';
import AdministracionProductos from './AdministracionProductos';
import VistaCarrito from './VistaCarrito';
import Header from './Header';
import Footer from './Footer';
import QuienesSomos from './QuienesSomos';
import Contacto from './Contacto';

function FormularioLogin({ cambiarModo, manejarCambio, datosFormulario, manejarSubmit, onAbrirModalReseteo }) {
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
            value={datosFormulario.email || ''}
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
            value={datosFormulario.password || ''}
            onChange={manejarCambio}
            required
          />
          <button
            type="button"
            onClick={onAbrirModalReseteo}
            className="inline-block align-baseline font-bold text-sm text-amber-600 hover:text-amber-800 focus:outline-none"
          >
            ¿Olvidaste tu contraseña?
          </button>
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
            value={datosFormulario.nombreCompleto || ''}
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
            value={datosFormulario.email || ''}
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
            value={datosFormulario.password || ''}
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
  const [mostrarModalReseteo, setMostrarModalReseteo] = useState(false);
  const [emailReseteo, setEmailReseteo] = useState('');

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
          } catch (e) { console.error("Error al parsear carrito:", e); localStorage.removeItem('carrito'); }
        }
      } catch (e) {
        console.error("Error al parsear usuario:", e);
        manejarLogout();
      }
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      localStorage.removeItem('carrito');
    }
  }, [carrito, usuario]);

  const cambiarVista = (vista) => {
    setVistaActual(vista);
    if (!['catalogo', 'quienesSomos', 'contacto'].includes(vista)) {
        window.scrollTo(0, 0);
    }
  };
  const cambiarModo = () => {
    setEsLogin(!esLogin);
    setDatosFormulario({ email: '', password: '', nombreCompleto: '' });
    setMensaje(''); setError('');
  };
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario(prevState => ({ ...prevState, [name]: value }));
  };

  const manejarLogout = () => {
    setUsuario(null); setCarrito([]);
    localStorage.removeItem('token'); localStorage.removeItem('usuario'); localStorage.removeItem('carrito');
    setEsLogin(true); setVistaActual('catalogo');
  };
  const manejarRegistroSubmit = async (evento) => {
    evento.preventDefault(); setMensaje(''); setError('');
    try {
      const respuesta = await api.post('/autenticacion/registrar', {
        nombreCompleto: datosFormulario.nombreCompleto, email: datosFormulario.email, password: datosFormulario.password,
      });
      setMensaje(respuesta.data.mensaje);
    } catch (err) {
      console.error("Error registro:", err.response?.data);
      const errorMsg = err.response?.data?.errors ? Object.values(err.response.data.errors).flat().join(' ') : err.response?.data?.Errores?.join(' ') || 'Error inesperado.';
      setError(errorMsg);
    }
  };
  const manejarLoginSubmit = async (evento) => {
    evento.preventDefault(); setMensaje(''); setError('');
    try {
      const respuesta = await api.post('/autenticacion/login', { email: datosFormulario.email, password: datosFormulario.password });
      const datosUsuario = { email: respuesta.data.email, roles: respuesta.data.roles };
      localStorage.setItem('token', respuesta.data.token); localStorage.setItem('usuario', JSON.stringify(datosUsuario));
      setUsuario(datosUsuario);
      setVistaActual('catalogo');
    } catch (err) {
      console.error("Error login:", err.response?.data);
      setError(err.response?.data?.mensaje || 'Credenciales incorrectas o correo no confirmado.');
    }
  };
  const abrirModalSolicitudReseteo = () => {
    setEmailReseteo(''); setError(''); setMensaje('');
    setMostrarModalReseteo(true);
  };
  const manejarSolicitarReseteo = async (evento) => {
    evento.preventDefault(); setError(''); setMensaje('');
    try {
      await api.post('/autenticacion/solicitar-reseteo', { email: emailReseteo });
      setMostrarModalReseteo(false);
      Swal.fire({ icon: 'success', title: '¡Revisa tu correo!', text: 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.', confirmButtonColor: '#a97a4a' });
    } catch (err) {
      console.error("Error solicitar reseteo:", err.response?.data);
      setError(err.response?.data?.mensaje || 'No se pudo enviar el enlace. Inténtalo de nuevo.');
    }
  };

  const agregarAlCarrito = (producto) => {
    setCarrito(carritoActual => {
      const idx = carritoActual.findIndex(item => item.producto.id === producto.id);
      if (idx > -1) {
        Swal.fire({ icon: 'info', title: `${producto.nombre} ya está en el carrito`, toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 });
        return carritoActual;
      } else {
        Swal.fire({ icon: 'success', title: `${producto.nombre} añadido al carrito`, toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, timerProgressBar: true });
        return [...carritoActual, { producto: producto, cantidad: 1 }];
      }
    });
  };
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    const cantidad = Math.max(1, parseInt(nuevaCantidad) || 1);
    setCarrito(carritoActual => carritoActual.map(item => item.producto.id === productoId ? { ...item, cantidad: cantidad } : item));
  };
  const eliminarDelCarrito = (productoId) => {
    setCarrito(carritoActual => carritoActual.filter(item => item.producto.id !== productoId));
    Swal.fire({ icon: 'info', title: 'Producto eliminado', toast: true, position: 'top-end', showConfirmButton: false, timer: 1000 });
  };
  const procederAlPago = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Simulación de Pago Seguro',
      html: `
        <input id="swal-input-nombre" class="swal2-input" placeholder="Nombre como aparece en la tarjeta">
        <input id="swal-input-numero" class="swal2-input" placeholder="Número de tarjeta (ficticio)">
        <input id="swal-input-cvv" class="swal2-input" placeholder="CVV (ficticio)" type="password" maxlength="3">
      `,
      focusConfirm: false, confirmButtonText: 'Pagar Ahora', showCancelButton: true, cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = document.getElementById('swal-input-nombre').value;
        const numero = document.getElementById('swal-input-numero').value;
        if (!nombre || !numero) { Swal.showValidationMessage(`Por favor, ingresa nombre y número de tarjeta`); return false; }
        return { nombre, numero };
      }
    });
    if (formValues) {
      Swal.fire({
        title: 'Procesando tu pago...', text: 'Esto tomará unos segundos.', timer: 3000,
        allowOutsideClick: false, didOpen: () => { Swal.showLoading(); }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          Swal.fire('¡Pago Realizado!', 'Tu pedido está listo para recoger en tienda.', 'success');
          setCarrito([]); setVistaActual('catalogo');
        }
      });
    }
  };

  if (usuario) {
    return (
      <div className="min-h-screen bg-amber-50 font-sans flex flex-col">
        <Header
          usuario={usuario}
          manejarLogout={manejarLogout}
          cambiarVista={cambiarVista}
          cantidadCarrito={carrito.length}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          
          {vistaActual === 'admin' ? (
            <AdministracionProductos />
          ) : vistaActual === 'carrito' ? (
            <VistaCarrito
              carrito={carrito}
              cambiarVista={cambiarVista}
              procederAlPago={procederAlPago}
              actualizarCantidad={actualizarCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          ) : (
            <>
              <QuienesSomos />
              <div className="mt-12">
                <Catalogo agregarAlCarrito={agregarAlCarrito} />
              </div>
              <div className="mt-12">
                <Contacto />
              </div>
            </>
          )}
          
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4 font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-amber-900">Cafetería del Aroma</h1>
        <p className="text-amber-700 mt-2">Tu café favorito, a un clic de distancia.</p>
      </header>

      <main className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative z-10">
        {mensaje && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{mensaje}</div>}
        {error && !mostrarModalReseteo && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">{error}</div>}

        {esLogin ? (
          <FormularioLogin
            cambiarModo={cambiarModo}
            manejarCambio={manejarCambio}
            datosFormulario={datosFormulario}
            manejarSubmit={manejarLoginSubmit}
            onAbrirModalReseteo={abrirModalSolicitudReseteo}
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

      {mostrarModalReseteo && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h3 className="text-xl font-bold text-amber-900 mb-4">Restablecer Contraseña</h3>
            <p className="text-sm text-gray-600 mb-4">Ingresa tu correo electrónico y te enviaremos un enlace.</p>
            <form onSubmit={manejarSolicitarReseteo}>
              <div className="mb-4">
                <label htmlFor="emailReseteo" className="block text-amber-800 text-sm font-bold mb-2">Correo Electrónico</label>
                <input
                  id="emailReseteo" type="email"
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="tu@correo.com" value={emailReseteo}
                  onChange={(e) => setEmailReseteo(e.target.value)} required
                />
              </div>
              {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
              <div className="flex items-center justify-between gap-4 mt-6">
                <button type="button" onClick={() => setMostrarModalReseteo(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg flex-1" >
                  Cancelar
                </button>
                <button type="submit"
                  className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg flex-1">
                  Enviar Enlace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import React from 'react';
import Swal from 'sweetalert2'; 

// --- (INICIO) NUEVAS IMPORTACIONES ---
import { Swiper, SwiperSlide } from 'swiper/react';
// Importamos 'EffectFade' para el efecto de desvanecido
import { Autoplay, EffectFade } from 'swiper/modules';

// Importar los estilos de Swiper (generales y de fade)
import 'swiper/css';
import 'swiper/css/effect-fade';
// --- (FIN) NUEVAS IMPORTACIONES ---


function Contacto() {
  
  const manejarEnvio = (e) => {
    e.preventDefault();
    Swal.fire('Mensaje Enviado', 'Gracias por contactarnos. Te responderemos pronto.', 'success');
    e.target.reset(); 
  };

  // --- (AÑADIDO) Array de imágenes de campos de café ---
  const imagenesFinca = [
    "https://plus.unsplash.com/premium_photo-1666976509887-e33fa169533f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhbnRhJTIwZGUlMjBjYWZlfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000", // Campo verde
    "https://media.istockphoto.com/id/1250294651/es/foto/primer-plano-de-fruta-de-caf%C3%A9-en-finca-de-caf%C3%A9-y-plantaciones-en-brasil.jpg?s=612x612&w=0&k=20&c=9J6t3FCNlZ24hr_pKeCb5yum8k_XGbC_x3GRyEBbFus=", // Cerezas de café en la rama
    "https://www.disagro.com.gt/wp-content/uploads/2022/03/foto-cafe-2-2-1.jpg"  // Grano de café en la planta
  ];
  // --- (FIN) Array de imágenes ---

  return (
    <div id="contacto" className="relative p-8 max-w-7xl mx-auto py-20 overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-white opacity-70"></div>
      
      {/* Grid con 'items-stretch' para altura igual */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        
        {/* === Columna Izquierda (CON CAJA) === */}
        <div className="bg-white p-10 rounded-xl shadow-2xl border border-gray-100 flex flex-col"> {/* Añadido flex flex-col */}
          
          {/* Contenido superior (flexible) */}
          <div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              ¿Hablemos de café?
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              Nos encantaría escucharte. Ya sea para preguntas, sugerencias o simplemente para saludar, estamos aquí para ti.
            </p>
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="text-xl mr-3">📍</span> 
                <p className="text-gray-800 text-lg">123 Calle del Café, Ciudad Aroma</p>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-3">📞</span> 
                <p className="text-gray-800 text-lg">+123 456 7890</p>
              </div>
              <div className="flex items-center">
                <span className="text-xl mr-3">📧</span> 
                <p className="text-gray-800 text-lg">hola@cafeteriadelaroma.com</p>
              </div>
            </div>
          </div>

          {/* --- (INICIO) MODIFICACIÓN: Carrusel de Finca de Café --- */}
          {/* Este 'div' reemplaza el 'div' de 'Síguenos' */}
          {/* 'mt-10' le da espacio, h-48 le da altura fija, 'mt-auto' empuja esto al fondo si hay espacio */}
          <div className="mt-10 w-full h-48 rounded-lg overflow-hidden shadow-md">
            <Swiper
              // Módulos
              modules={[Autoplay, EffectFade]}
              
              // Configuración
              effect="fade" // Efecto de desvanecido
              loop={true}
              spaceBetween={0}
              slidesPerView={1}
              
              // Autoplay
              autoplay={{
                delay: 3500, // Un poco más lento que el principal
                disableOnInteraction: false,
              }}
              
              // Clases para Swiper
              className="w-full h-full"
            >
              {imagenesFinca.map((url, index) => (
                <SwiperSlide key={index}>
                  <img 
                    src={url} 
                    alt={`Campo de siembra de café ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* --- (FIN) MODIFICACIÓN --- */}

        </div>

        {/* === Columna del Formulario (Derecha) === */}
        <div className="bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Envíanos un Mensaje</h3>
          <form onSubmit={manejarEnvio}>
             {/* ... (inputs del formulario sin cambios) ... */}
             <div className="mb-6">
               <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="nombreContacto">Nombre</label>
               <input className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200" id="nombreContacto" type="text" placeholder="Tu nombre completo" required/>
             </div>
             <div className="mb-6">
               <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="emailContacto">Correo Electrónico</label>
               <input className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200" id="emailContacto" type="email" placeholder="tu@correo.com" required/>
             </div>
             <div className="mb-8">
               <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="mensajeContacto">Mensaje</label>
               <textarea className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200" id="mensajeContacto" rows="6" placeholder="¿Cómo podemos ayudarte?" required></textarea>
             </div>
             
             <div className="flex justify-center">
               <button className="w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105" type="submit">
                 Enviar Mensaje
               </button>
             </div>
           </form>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
import React from 'react';

// --- (INICIO) MODIFICACIÓN: Importar Swiper ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Importar los estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';
// --- (FIN) MODIFICACIÓN ---

function QuienesSomos() {
  
  // Array de imágenes para el carrusel (puedes cambiarlas por las tuyas)
  const imagenes = [
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2070&auto=format&fit=crop", // La que tenías
    "https://www.buenossaborespanama.com/wp-content/uploads/2022/03/tiramisu-2021-08-26-17-51-57-utc-scaled.jpg", // Imagen 2
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop"  // Imagen 3
  ];

  return (
    <div id="quienesSomos" className="p-8 max-w-4xl mx-auto mt-12 py-16">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* === Columna de Texto (Sin cambios) === */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-left">
            Sobre Nosotros
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Somos apasionados por el café de calidad. Desde nuestros inicios, nos hemos dedicado a seleccionar los mejores granos y a preparar cada taza con esmero para ofrecerte una experiencia única. 
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            Creemos en un ambiente acogedor donde puedas disfrutar de un momento de tranquilidad o una buena conversación.
            Nuestra misión es ser tu rincón favorito para despertar tus sentidos cada mañana o relajarte por la tarde. ¡Ven y descubre el auténtico sabor del café!
          </p>
        </div>

        {/* --- (INICIO) MODIFICACIÓN: Reemplazar <img> por <Swiper> --- */}
        <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg">
          <Swiper
            // Registrar los módulos que usaremos
            modules={[Autoplay, Pagination]}
            
            // Configuración
            spaceBetween={0}        // Sin espacio entre diapositivas
            slidesPerView={1}       // Mostrar 1 diapositiva a la vez
            loop={true}             // Para que sea un ciclo infinito
            
            // Rotación automática
            autoplay={{
              delay: 3000, // Cada 3 segundos
              disableOnInteraction: false, // Sigue rotando después de que el usuario interactúe
            }}
            
            // Paginación (los puntos de abajo)
            pagination={{
              clickable: true, // Permite hacer clic en los puntos
            }}
            
            // Clases para asegurar que Swiper llene el contenedor
            className="w-full h-full"
          >
            {/* Iteramos sobre el array de imágenes */}
            {imagenes.map((url, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={url} 
                  alt={`Vist de la cafetería ${index + 1}`}
                  className="w-full h-full object-cover" // object-cover es clave
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* --- (FIN) MODIFICACIÓN --- */}

      </div>
    </div>
  );
}

export default QuienesSomos;
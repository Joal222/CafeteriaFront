    import React from 'react';

    function Footer() {
      return (
        <footer className="bg-white border-t border-gray-200 mt-12 py-6">
          <div className="w-full max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-gray-500">&copy; 2025 Cafetería del Aroma. Todos los derechos reservados.</p>
            <div className="d-flex justify-items-center items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Síguenos</h3>            
              </div>
              <div className="flex gap-4 mt-4 sm:mt-0">
                
                <a href="#" className="text-gray-500 hover:text-amber-800 transition duration-300">Facebook</a>
                <a href="#" className="text-gray-500 hover:text-amber-800 transition duration-300">Instagram</a>
                <a href="#" className="text-gray-500 hover:text-amber-800 transition duration-300">Twitter</a>
              </div>
            </div>
          </div>
        </footer>
      );
    }

    export default Footer;
    

import React from 'react';
import filmsStore from '../stores/FilmStore'; // Asumiendo que has exportado el store correctamente
import '../entradas.css'
function Entradas() {
  const entradas = filmsStore.filmsState.entradas || [];

  return (
    
    <div className="container">
        <h2 className="text-center mt-5 mb-5">Entradas Compradas</h2>
      {entradas.length > 0 ? (
        <div className="info-entradas">
          {entradas.map((entrada, index) => (
            <div key={index} className="info-entrada">
              <p><strong>Película:</strong> {entrada.pelicula}</p>
              <p><strong>Número de Entradas:</strong> {entrada.numEntradas}</p>
              <p><strong>Hora:</strong> {entrada.hora}</p>
              <p><strong>Sala:</strong> {entrada.sala}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No se han comprado entradas aún.</p>
      )}
    </div>
  );
}

export default Entradas;

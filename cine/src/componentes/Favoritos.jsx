import React from 'react';
import { observer } from 'mobx-react';
import filmsStore from '../stores/FilmStore'; // Importa tu store de películas
import '../Favoritos.css'; // Importa tu archivo CSS para estilos

function Favoritos() {
  const { favoritos } = filmsStore.filmsState;

  return (
    <div className="container">
      <h2>Películas Favoritas</h2>
      <div className="row">
        {favoritos.map((pelicula) => (
          <div key={pelicula.id} className="col">
            <img src={`https://image.tmdb.org/t/p/w300${pelicula.poster_path}`} alt={pelicula.title} />
            <h1>{pelicula.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(Favoritos);

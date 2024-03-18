import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Peliculas.css';
import filmsStore from '../stores/FilmStore'; // Asumiendo que has exportado el store correctamente
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom

function Peliculas() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async (searchKey) => {
    try {
      const { data } = await axios.get(`${API_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });
      filmsStore.setFilms(data.results);
    } catch (error) {
      console.error(error);
      // Handle error here, e.g., show a notification to the user
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
        },
      });
      filmsStore.setFilms(data.results);
    } catch (error) {
      console.error(error);
      // Handle error here, e.g., show a notification to the user
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Trailer Popular Movies</h2>

      <form className="buscar" onSubmit={(e) => { e.preventDefault(); fetchMovies(searchTerm); }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar películas..."
        />
        <button type="submit">Buscar</button>
      </form>

      <main>
        <div className="container">
          {filmsStore.filmsState.films.map((movie) => (
            <div key={movie.id} className="col-md-4">
              {/* Ancho ajustado para tener en cuenta el margen */}
              <div
                className="viewtrailer"
                style={{
                  backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                  cursor: "pointer",
                }}
              >
                {/* Utilizar Link para redirigir al componente de detalles al hacer clic */}
                <Link to={`/DetallePelicula/${movie.id}`} className="link">
                  <h1>{movie.title}</h1>
                </Link>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default observer(Peliculas);

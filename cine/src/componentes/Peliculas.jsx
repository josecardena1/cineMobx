import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Peliculas.css';
import YouTube from 'react-youtube';
import filmsStore from '../stores/FilmStore'; // Asumiendo que has exportado el store correctamente
import { observer } from 'mobx-react';

function Peliculas() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("3");
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [numEntradas, setNumEntradas] = useState(1);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showFullMovie, setShowFullMovie] = useState(false);
  const [showPurchaseProcess, setShowPurchaseProcess] = useState(false);

  const fetchMovies = async (searchKey) => {
    try {
      await filmsStore.prefetchData(searchKey);
    } catch (error) {
      console.error(error);
      // Handle error here, e.g., show a notification to the user
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    await fetchMovie(movie.id);
    setSelectedMovie(movie);
    setShowFullMovie(true);
    setShowPurchaseProcess(true);
    setModalOpen(true); // Mostrar el modal al seleccionar una película
    window.scrollTo(0, 0);
  };

  const closeFullMovie = () => {
    setShowFullMovie(false);
    setTrailer(null); // Limpiar el tráiler al cerrar la película en grande
    setModalOpen(false);
    setShowPurchaseProcess(false);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPurchaseSuccess(false);
    setFormErrors({});
    setShowPurchaseProcess(false);
  };

  const handleBuyClick = () => {
    localStorage.setItem('selectedMovie', JSON.stringify(this.filmsState.selectedMovie));
    localStorage.setItem('selectedTime', this.filmsState.selectedTime);
    this.setModalOpen(false);
    this.setPurchaseSuccess(true);
}
  const handleAgregarFavorito = () => {
    filmsStore.setFavoritos([...filmsStore.filmsState.favoritos, selectedMovie]);
    localStorage.setItem('favoritos', JSON.stringify(filmsStore.filmsState.favoritos));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime || !selectedRoom) {
      setFormErrors({ time: !selectedTime, room: !selectedRoom });
      return;
    }
    handleBuyClick();
    setTimeout(() => {
      setPurchaseSuccess(false);
      setFormErrors({});
    }, 3000);
  };

  useEffect(() => {
    fetchMovies("");
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5" style={{ color: 'white',textAlign:'center', textShadow: '0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px white, 0 0 50px white, 0 0 60px white, 0 0 70px white' }}>Trailer Popular Movies</h2>

      <form className="buscar" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="buscarboton">Search</button>
      </form>

      <main>
        <div className="container">
          {filmsStore.filmsState.films.reduce((rows, movie, index) => {
            if (index % 1 === 0) rows.push([]);
            rows[rows.length - 1].push(movie);
            return rows;
          }, []).map((row, rowIndex) => (
            <div key={rowIndex} className="row mb-4">
              {row.map((movie, colIndex) => (
                <div key={colIndex} className="col-md-4">
                  {/* Ancho ajustado para tener en cuenta el margen */}
                  <div
                    className="viewtrailer"
                    style={{
                      backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                      cursor: "pointer",
                    }}
                    onClick={() => selectMovie(movie)}
                  >
                    <h1 className="text-white">{movie.title}</h1>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {modalOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedMovie.title}</h2>
            <div className="reproductor">
              {showFullMovie && trailer ? (
                <>
                  <YouTube videoId={trailer.key} opts={{ width: '100%', height: '300px' }} />
                  <div className="card-container">
                    <div className="card">
                      <h3>Valoración: {selectedMovie.vote_average}</h3>
                      <p><b>Sinopsis:</b> {selectedMovie.overview}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="time">Hora:</label>
                        <select
                          id="time"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className={formErrors.time ? 'error' : ''}
                        >
                          <option value="">Selecciona una hora</option>
                          <option value="3">3:00 PM</option>
                          <option value="5">5:00 PM</option>
                          <option value="7">7:00 PM</option>
                          <option value="9">9:00 PM</option>
                        </select>
                        {formErrors.time && <p className="error-text">Campo obligatorio</p>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="room">Sala:</label>
                        <input
                          type="number"
                          id="room"
                          value={selectedRoom}
                          min={1}
                          max={7}
                          onChange={(e) => setSelectedRoom(parseInt(e.target.value))}
                          className={formErrors.room ? 'error' : ''}
                        />
                        {formErrors.room && <p className="error-text">Campo obligatorio</p>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="numEntradas">Número de entradas:</label>
                        <input
                          type="number"
                          id="numEntradas"
                          value={numEntradas}
                          min={1}
                          onChange={(e) => setNumEntradas(parseInt(e.target.value))}
                        />
                      </div>
                      <div className="buttons">
                        <button onClick={handleBuyClick} type="submit" className="botones">Confirmar compra</button>
                        <button onClick={handleAgregarFavorito} type="button" className="botones">Añadir a favoritos</button>
                      </div>
                    </form>
                    {purchaseSuccess && <p className="text-success">¡Compra realizada con éxito!</p>}
                  </div>
                </>
              ) : (
                <p>No hay tráiler disponible</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(Peliculas);

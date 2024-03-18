import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import filmsStore from '../stores/FilmStore'; // Asumiendo que has exportado el store correctamente
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom'; // Importar useParams desde react-router-dom
import Entradas from './Entradas'; // Importar el componente Entradas
import '../detalles.css'
function DetallePelicula() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
  const [trailer, setTrailer] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("3");
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [numEntradas, setNumEntradas] = useState(1);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { id } = useParams(); // Obtener el parámetro de la URL

  const fetchMovie = async () => {
    try {
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
      setSelectedMovie(data);
    } catch (error) {
      console.error(error);
      // Handle error here, e.g., show a notification to the user
    }
  };

  const handleBuyClick = () => {
    const entrada = {
      pelicula: selectedMovie.title,
      numEntradas,
      hora: selectedTime,
      sala: selectedRoom,
    };

    const entradas = filmsStore.filmsState.entradas || [];
    entradas.push(entrada);
    filmsStore.setEntradas(entradas);
    localStorage.setItem('entradas', JSON.stringify(entradas));
    setPurchaseSuccess(true); // Confirmar la compra al hacer clic en el botón
  };

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
    fetchMovie();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-5">Detalle de la Película</h2>
      {selectedMovie && (
        <>
          <h2>{selectedMovie.title}</h2>
          <div className="reproductor">
            {trailer ? (
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
                        className={formErrors.time ? 'error neon-input' : 'neon-input'}
                        style={{ width: '100%', marginBottom: '10px' }}
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
                        className={formErrors.room ? 'error neon-input' : 'neon-input'}
                        style={{ width: '100%', marginBottom: '10px' }}
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
                        className="neon-input"
                        style={{ width: '100%', marginBottom: '10px' }}
                      />
                    </div>
                    <div className="buttons">
                      <button type="submit" className="neon-button">Confirmar compra</button>
                      <button type="button" onClick={handleAgregarFavorito} className="neon-button">Añadir a favoritos</button>
                    </div>
                  </form>
                  {purchaseSuccess && <p className="text-success">Compra realizada con éxito</p>}
                </div>
              </>
            ) : (
              <p>No hay tráiler disponible</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default observer(DetallePelicula);

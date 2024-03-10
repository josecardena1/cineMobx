import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class FilmsStore {
    API_URL = "https://api.themoviedb.org/3";
    API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
    
    filmsState = {
        films: [],
        favoritos: [],
        //otros atributos de estado...
    }

    constructor() {
        makeObservable(this, {
            filmsState: observable,
            prefetchData: action,
            setFilms: action,
            setFavoritos: action
        });
        this.prefetchData();
    }

    setFilms = (films) => {
        this.filmsState.films = films;
    }

    setFavoritos = (favoritos) => {
        this.filmsState.favoritos = favoritos;
    }

    prefetchData = async () => {
        try {
            const response = await axios.get(`${this.API_URL}/movie/popular`, {
                params: {
                    api_key: this.API_KEY,
                    language: "es", // Opcional, ajusta según tu preferencia de idioma
                    page: 1, // Obtener la primera página de resultados
                }
            });

            const films = response.data.results.slice(0, 20); // Obtener solo las primeras 20 películas
            console.log("Películas obtenidas:", films);

            this.setFilms(films);
        } catch (error) {
            console.error("Error al buscar películas", error);
        }
    }
}

const filmsStore = new FilmsStore();
export default filmsStore;

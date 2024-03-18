import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';

class FilmsStore {
    API_URL = "https://api.themoviedb.org/3";
    API_KEY = "4f5f43495afcc67e9553f6c684a82f84";
    
    filmsState = {
        films: [],
        favoritos: [],
        entradas: JSON.parse(localStorage.getItem('entradas')) || [], // Obtener las entradas guardadas del localStorage al inicio
    }

    constructor() {
        makeObservable(this, {
            filmsState: observable,
            prefetchData: action,
            setFilms: action,
            setFavoritos: action,
            setEntradas: action, // Método para actualizar las entradas
            searchMoviesByKeyword: action,
        });
        this.prefetchData();
    }

    setFilms = (films) => {
        this.filmsState.films = films;
    }

    setFavoritos = (favoritos) => {
        this.filmsState.favoritos = favoritos;
    }

    setEntradas = (entradas) => { // Método para actualizar las entradas
        this.filmsState.entradas = entradas;
    }

    prefetchData = async () => {
        try {
            const response = await axios.get(`${this.API_URL}/movie/popular`, {
                params: {
                    api_key: this.API_KEY,
                    language: "es",
                    page: 1,
                }
            });

            const films = response.data.results.slice(0, 20);
            console.log("Películas obtenidas:", films);

            this.setFilms(films);
        } catch (error) {
            console.error("Error al buscar películas", error);
        }
    }

    searchMoviesByKeyword = async (keywords) => {
        try {
            const response = await axios.get(`${this.API_URL}/search/movie`, {
                params: {
                    api_key: this.API_KEY,
                    query: keywords,
                }
            });

            const films = response.data.results;
            console.log("Películas encontradas:", films);

            this.setFilms(films);
        } catch (error) {
            console.error("Error al buscar películas por palabra clave", error);
        }
    }
}

const filmsStore = new FilmsStore();
export default filmsStore;

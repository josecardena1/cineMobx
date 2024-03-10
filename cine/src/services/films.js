const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "4f5f43495afcc67e9553f6c684a82f84";

export const getMoviesBy = async (keywords) => {
    try {
        const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${keywords}`);

        if (!response.ok) {
            throw new Error("Error al obtener películas");
        }

        return response.json();
    } catch (error) {
        throw new Error("Error al buscar películas");
    }
};

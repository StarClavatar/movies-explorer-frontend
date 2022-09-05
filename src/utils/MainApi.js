class mestoApi {
    constructor(params) {
        this._baseUrl = params.baseUrl;
        this._headers = params.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    }

    // обновление данных пользоателя
    patchProfile(email, name) {
        return fetch(
                `${this._baseUrl}/users/me`, {
                    method: 'PATCH',
                    headers: this._headers,
                    body: JSON.stringify({
                        email: email,
                        name: name,
                    })
                }
            )
            .then(this._checkResponse);
    }

    //запрашиваем массив карточек с сервера
    getSavedMovies() {
        return fetch(
                `${this._baseUrl}/movies`, {
                    method: 'GET',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
    }
    
    //создаём новую карточку
    saveMovie(movie) {
        return fetch(
                `${this._baseUrl}/movies`, {
                    method: 'POST',
                    headers: this._headers,
                    body: JSON.stringify({
                        country: movie.country,
                        director: movie.director,
                        duration: movie.duration,
                        year: movie.year,
                        description: movie.description,
                        image: movie.image,
                        trailerLink: movie.trailerLink,
                        thumbnail: movie.thumbnail,
                        movieId: movie.movieId,
                        nameRU: movie.nameRU,
                        nameEN: movie.nameEN
                    })
                }
            )
            .then(this._checkResponse);
    }

    deleteMovie(movieId) {
        return fetch(
                `${this._baseUrl}/movies/${movieId}`, {
                    method: 'DELETE',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
    }

    // загружаем токен
    loadToken() {
        this._headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }

}

const Api = new mestoApi({
    // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-32",
    // baseUrl: "http://localhost:3000",
    baseUrl: "https://movies-api.clavatar.nomoreparties.sbs",
    headers: {
        // Authorization: 'ce5975c2-555f-46c5-8851-9175f75178d9',
        'Content-Type': 'application/json'
    }
});

export default Api;

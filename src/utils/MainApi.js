import { BASE_URL } from '../constants/constants';

class moviesApi {
    constructor(params) {
        this._baseUrl = params.baseUrl;
        this._headers = params.headers;
    }

    // проверяем результат ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else if (res.status===401) {
            if (this._unAuthorizedCallBack) this._unAuthorizedCallBack();
        }
        return Promise.reject(res);
    }

    // обновление данных пользоателя
    patchProfile(email, name) {
        this.loadToken();
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
            .then(this._checkResponse.bind(this));
    }

    //запрашиваем массив карточек с сервера
    getSavedMovies() {
        this.loadToken();
        return fetch(
                `${this._baseUrl}/movies`, {
                    method: 'GET',
                    headers: this._headers
                }
            )
            .then(this._checkResponse.bind(this));
    }
    
    //создаём новую карточку
    saveMovie(movie) {
        this.loadToken();
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
            .then(this._checkResponse.bind(this));
    }

    // удаляем фильм из сохраненных
    deleteMovie(movieId) {
        this.loadToken();
        return fetch(
                `${this._baseUrl}/movies/${movieId}`, {
                    method: 'DELETE',
                    headers: this._headers
                }
            )
            .then(this._checkResponse.bind(this));
    }

    // загружаем токен
    loadToken() {
        this._headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }

    unAuthorizedCallBack (callBack) {
        this._unAuthorizedCallBack = callBack;
    }
}

const Api = new moviesApi({
    baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default Api;

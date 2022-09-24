class moviesApi {
    constructor(params) {
        this._baseUrl = params.baseUrl;
        this._headers = params.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //запрашиваем массив карточек с сервера
    getMovies() {
        return fetch(
                `${this._baseUrl}/beatfilm-movies`, 
                {
                    method: 'GET',
                    headers: this._headers
                }
            )
            .then(this._checkResponse);
    }

    baseUrl() {return this._baseUrl}
}

const Api = new moviesApi({
    baseUrl: "https://api.nomoreparties.co",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default Api;

import { BASE_URL } from '../constants/constants';

// проверяем результат ответа
const _checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res);
}

export function register (name, email, password) {
    return fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {   'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})}
    )
    .then(_checkResponse);
};

export function authorize (email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(_checkResponse);
};

export function checkToken (token) {
    return fetch(
        `${BASE_URL}/users/me`, 
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    )
    .then(_checkResponse)
}

// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://movies-api.clavatar.nomoreparties.sbs';
// export const BASE_URL = 'http://localhost:3000';

export function register (name, email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, name})
    })
    .then((response) => {
        return response.json()
            .then (reslt=>{
                return { 'code': response.status,'body': reslt }
            });
    })
    .catch((err) => {
        console.log(err)
    });
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
    .then((response => response.json()))
    .catch(err => console.log(err))
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
    .then(res => res.json())
    .catch(err => console.log(err));
}

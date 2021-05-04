export const BASE_URL = 'https://api.nomoreparties.co';

const checkResponse = (response) => {
  return response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));
};

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const register = ({ username, password, email }) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
  })
    .then(res => checkResponse(res));
};

export const authorize = ({ username: identifier, password }) => {
  return fetch(`${BASE_URL}/auth/local`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  })
    .then(res => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => checkResponse(res));
};

class Auth {//по образцу api.js
  constructor(baseUrl) {
    this._baseUrl = baseUrl;// тело конструктора
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(this._getResponseData)
  }

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        password,
        email
      })
    })
      .then(this._getResponseData)
      .then(data => data)
  }

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
      .then(this._getResponseData)
      .then(data => data)
  }
}

export const auth = new Auth('https://auth.nomoreparties.co')
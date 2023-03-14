// Подключаем api. Токен мой, хлама в бэке тьма. Значит далее  надо фильтровать по User

const config = {
  baseUrl: 'https://api.react-learning.ru/v2/group-10',
  headers: {
    'content-type': 'application/json',
   Authorization:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4YTQ4OTU5Yjk4YjAzOGY3N2I1MmYiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MTkyMDM4LCJleHAiOjE3MDc3MjgwMzh9.6bsv1H1CriXvGBtMKgh0IWfZ_wTUss84mf10HA-uC-E' 
   /* Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4YTQ4OTU5Yjk4YjAzOGY3N2I1MmYiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MTkyMDM4LCJleHAiOjE3MDc3MjgwMzh9.6bsv1H1CriXvGBtMKgh0IWfZ_wTUss84mf10HA-uC-E' */
  },
};

//

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Error');
};

// Класс api для работы со списком твара

class Api {
  // {baseUrl, headers}
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }
  // Получаем список товаров

  getProductList(page = 1) {
    return fetch(`${this._baseUrl}/products?page=${page}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  
  // Получаем продукт по ID

  getProductById(id) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }

  // Добавляем продукт
  addProduct(data) {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => onResponse(res));
  }
  // Получаем  пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }

  // Запрос на поиск товара  
  searchProducts(query) {
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  // Работа с лайками - true / false
  changeLikeProductStatus(productId, like) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: like ? 'PUT' : 'DELETE',
    }).then((res) => onResponse(res));
  }
  deleteLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: 'DELETE'
    }).then((res) => onResponse(res));
  }
  addLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: 'PUT'
    }).then((res) => onResponse(res));
  }
}

export const api = new Api(config);


// api.getProductList();
/*
export const getProductList = () => {
  return fetch(`${config.baseUrl}/products`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
};

export const searchProducts = (query) => {
  return fetch(`${config.baseUrl}/products/search?query=${query}`, {
    headers: config.headers,
  }).then((res) => onResponse(res));
}; */

// api.getProductList();



// export const funct = () => {
//  return fetch().then(onResponse)
// }

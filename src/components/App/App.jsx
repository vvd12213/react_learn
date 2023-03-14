// Подключаем компоненты страницы

// Подключаем стандартные хуки
import React, { useEffect, useState } from 'react';

// Подкллючаем карточки товаров
//import { CardList } from '../CardList/CardList';

// Подключаем header
import { Header } from '../Header/Header';

//import { Product } from '../Product/Product';

// Подключаем footer
import { Footer } from '../Footer/Footer';

import './App.css';

// Подключаем api
import { api } from '../../utils/api';

import { useDebounce } from '../../utils/utils';






// Подключили роутинг хуки
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
// Подключили страницу продукта
import { ProductPage } from '../../pages/ProductPage/ProductPage';

// Подключили страницу каталога
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage';

// Подеключили контекст пользователя
import { UserContext } from '../../context/userContext'

// Подключили контекст карточки
import { CardContext } from '../../context/cardContext'


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
// Фильтр по пользователю

  //const filteredCards = (products, id) => products.filter((e) => e.author._id === id);

  // Без фильтра пользователя
  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards([...data]));
  };  
/* С фильтром пользователя

const handleSearch = (search) => {
  api.searchProducts(search).then((data) => setCards(filteredCards(data, currentUser._id)));
}; */

  const debounceValueInApp = useDebounce(searchQuery, 500);

  function handleProductLike(product) {
    const isLiked = product.likes.some((el) => el === currentUser._id);
    isLiked
      ? api.deleteLike(product._id).then((newCard) => {
        const newCards = cards.map((e) =>
          e._id === newCard._id ? newCard : e
        );
        //setCards(filteredCards(newCards, currentUser._id));
        setCards(newCards, currentUser._id);
      })
      : api.addLike(product._id).then((newCard) => {
        const newCards = cards.map((e) =>
          e._id === newCard._id ? newCard : e
        );
        //setCards(filteredCards(newCards, currentUser._id));
        setCards(newCards, currentUser._id);
      });
  } 

  // console.log('currentUser', currentUser._id);

  /* useEffect(() => {
    handleSearch(debounceValueInApp);
    // console.log({ debounceValueInApp });
  }, [debounceValueInApp]);

  useEffect(() => {
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]); */

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        {/* С фильтром по пользователю
        setCards(filteredCards(productData.products, userData._id)); 
      Ниже без фильтра */}
        setCards(productData.products, userData._id);
      }
    );
  }, []);


  const navigate = useNavigate();

 const someFunc = (data) => {
    console.log(data)
  }

  // Сортируем карточки по различным критериям
  const setSortCards = (sort) => {
    console.log(sort)
    if (sort === 'cheapest') {
      const newCards = cards.sort((a,b)=> a.price - b.price);
      setCards([...newCards]);
    }
    if (sort === 'richest') {
      const newCards = cards.sort((a,b)=> b.price - a.price);
      setCards([...newCards]);
    }
    if (sort === 'popular') {
      const newCards = cards.sort((a,b)=> b.likes.length - a.likes.length);
      setCards([...newCards]);
    }
    if (sort === 'newest') {
      const newCards = cards.sort((a,b)=> new Date(a.created_at) - new Date(b.created_at));
      setCards([...newCards]);
    }
  }
  

  const contextValue = { setSort: setSortCards, currentUser, searchQuery, setSearchQuery, setParentCounter, parentCounter }
  const contextCardValue = { cards:cards, setParentCounter, handleProductLike, onClickCard: someFunc }

  
  
  


  return (
    <>
     {/* Отключили в связи с подключением контекста 18022023
      <Header
        user={currentUser}
        parentCounter={parentCounter}
       // searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
  <main className='content container'> */}
        {/* Первоначальный вывод карточек
        searchQuery && (
          <p>
            По запросу {searchQuery} найдено {cards.length}
            {getIssues(cards.length)}
          </p>
        ) */}
       { /* <CardList
          currentUser={currentUser}
          handleProductLike={handleProductLike} 
          setParentCounter={setParentCounter}
          cards={cards}
        /> */ }
        

        { /* Поменяли на контекст chapter 15022023
        <Routes>
          <Route
            path='/'
            element={
              <CatalogPage
                searchQuery={searchQuery}
                cards={cards}
                currentUser={currentUser}
                handleProductLike={handleProductLike}
                setParentCounter={setParentCounter}
              />
            }
          ></Route>
          <Route path='/product/:productId' element={<ProductPage currentUser={currentUser} />}>
          </Route>
        </Routes>
      </main>

     
          <Footer /> */ }
      {/*Поменяли на контексты 180220223  */}
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header />
          <main className='content container'>
            <Routes>
              <Route
                path='/'
                element={
                  <CatalogPage />
                }
              ></Route>
              <Route path='product/:productId' element={<ProductPage />}>
              </Route>
              <Route path='fakeRout/:productId' element={<ProductPage />}>
              </Route>
              {/*Ссылка на страницу 404 */}
              <Route path='*' element={<div>404 no found <button onClick={() => navigate('/')}>Home</button></div>}>
              </Route>
            </Routes>

          </main>
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>    
    </>
  );
}

export default App;


// Шпора хуки
// useEffect - для побочных действий
// useEffect(()=>{}) - update на каждое изменение компонента.
// useEffect(()=>{},[state]) - update на каждое изменение конкретного state.
// useEffect(()=>{},[]) - update в самом начале


// Чистая функция - это функция , которая при одних и тех же входных параметрах возвращает одинаковый результат.

// Шпора routing
// <BrowserRouter>
//  <Routes>
//   <Route path="/" element={<Dashboard />}>
//   <Route path="product" element={<AboutPage />} />
// </Routes> 
// </BrowserRouter>
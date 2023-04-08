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

import './App.scss';

// Подключаем api
import { api } from '../../utils/api';

import { findLike, useDebounce } from '../../utils/utils';

// Подключили роутинг хуки
import { Route, Routes } from 'react-router-dom';
// Подключили страницу продукта
import { ProductPage } from '../../pages/ProductPage/ProductPage';

// Подключили страницу каталога
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage';

// Подеключили контекст пользователя
import { UserContext } from '../../context/userContext'

// Подключили контекст карточки
import { CardContext } from '../../context/cardContext'

// Страница Faq

import { FaqPage } from "../../pages/FAQ/FaqPage";

// Страница 404
import { NotFound } from "../../pages/NotFound/NotFound";

// Страница Избранное
import { Favorites } from "../../pages/Favorites/Favorites"; 

// Форма
import { Form } from "../Form/Form";

// Регистрационная форма
import { RegistrationForm } from "../Form/RegistrationForm";

// Модальное окно
import { Modal } from "../Modal/Modal";

//function App() {
  //const [cards, setCards] = useState([]);
  // const [searchQuery, setSearchQuery] = useState(undefined);
  // const [parentCounter, setParentCounter] = useState(0);
  //const [currentUser, setCurrentUser] = useState({});
// Фильтр по пользователю

  //const filteredCards = (products, id) => products.filter((e) => e.author._id === id);

  // Без фильтра пользователя
  //const handleSearch = (search) => {
    // api.searchProducts(search).then((data) => setCards([...data]));
 // };  
/* С фильтром пользователя

const handleSearch = (search) => {
  api.searchProducts(search).then((data) => setCards(filteredCards(data, currentUser._id)));
}; */

  //const debounceValueInApp = useDebounce(searchQuery, 500);

 /* function handleProductLike(product) {
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
  } */

  // console.log('currentUser', currentUser._id);

  /* useEffect(() => {
    handleSearch(debounceValueInApp);
    // console.log({ debounceValueInApp });
  }, [debounceValueInApp]);

  useEffect(() => {
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]); */

 /* useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        {/* С фильтром по пользователю
        setCards(filteredCards(productData.products, userData._id)); 
      Ниже без фильтра */
       /* setCards(productData.products, userData._id);
      }
    );
  }, []); */


 /* const navigate = useNavigate(); */

/* const someFunc = (data) => {
    console.log(data)
  } */

  function App() {
    const [cards, setCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState(undefined);
    const [parentCounter, setParentCounter] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [formData, setFormData] = useState([]);
    const [activeModal, setShowModal] = useState(false);
  
    const filteredCards = (products, id) => {
      return products
      // return products.filter((e) => e.author._id === id);
    };
    const handleSearch = (search) => {
      api
        .searchProducts(search)
        .then((data) => setCards(filteredCards(data, currentUser._id)));
    };
  
    const debounceValueInApp = useDebounce(searchQuery, 500);
    // функция по нажатию / отжатию лайка
    function handleProductLike(product) {
      // понимаем , отлайкан ли продукт
      const isLiked = findLike(product, currentUser);
      isLiked
        ? // Если товар был с лайком, значит было действие по удалению лайка
          api.deleteLike(product._id).then((newCard) => {
            // newCard - карточка с уже изменненым количеством лайков
            const newCards = cards.map((e) =>
              e._id === newCard._id ? newCard : e
            );
            setCards(filteredCards(newCards, currentUser._id));
            setFavorites((state) => state.filter((f) => f._id !== newCard._id));
          })
        : // Если не отлайкан, значит действие было совершено для добавления лайка.
          api.addLike(product._id).then((newCard) => {
            const newCards = cards.map((e) =>
              e._id === newCard._id ? newCard : e
            );
            setCards(filteredCards(newCards, currentUser._id));
            setFavorites((favor) => [...favor, newCard]);
          });
    }
  
    useEffect(() => {
      if (debounceValueInApp === undefined) return;
      handleSearch(debounceValueInApp);
    }, [debounceValueInApp]);
  
    // Первоначальная загрузка карточек и данных юзера
    useEffect(() => {
      Promise.all([api.getUserInfo(), api.getProductList()]).then(
        ([userData, productData]) => {
          // сеттим юзера
          setCurrentUser(userData);
          const items = filteredCards(productData.products, userData._id);
          // сеттим карточки
          setCards(items);
          // получаем отлайканные нами карточки
          const fav = items.filter((e) => findLike(e, userData));
          // сеттим карточки в избранный стейт
          setFavorites(fav);
        }
      );
    }, []);

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
  

  const contextValue = {
    setSort: setSortCards,
    currentUser,
    searchQuery,
    setSearchQuery,
    setParentCounter,
    parentCounter,
  };
  const contextCardValue = {
    cards: cards,
    setParentCounter,
    handleProductLike,
    favorites,
    setFavorites,
  };

  
  // Данные пользователя модальной формы регистрации
  const sendData = async (data) => {
    // setFormData((s) => [...s, data]);
    const result = await api.registerUser({ ...data, group: "group-10" });
    console.log({ result });
  };


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
          {/* Первая форма <Form sendData={sendData} />
          {formData.map((e) => (
            <div>
              <p>{e.name}</p>
              <p>{e.lastName}</p>
              <p>{e.phoneNumber}</p>
            </div>
          ))} */}
          {/*Модапльная форма регистрации */}
          <button onClick={() => setShowModal(true)}>Регистрация (модальная)</button>
          <Modal activeModal={activeModal} setShowModal={setShowModal}>
            <RegistrationForm sendData={sendData} />
          </Modal>

          {/* Была немодальная форма <RegistrationForm sendData={sendData} /> */}
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
              <Route path="faq" element={<FaqPage />}></Route>
              <Route path="favorites" element={<Favorites />}></Route>
              <Route path="*" element={<NotFound />}></Route>
              {/*Ссылка на страницу 404 */}
              {/*<Route path='*' element={<div>404 no found <button onClick={() => navigate('/')}>Home</button></div>}>
              </Route> */ }
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
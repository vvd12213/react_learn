//Импортируем хуки

import React, { useContext, useEffect, useState } from 'react';

import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './style.css';

// Импортируем корзину и ее иконку

import { ReactComponent as Basket } from './images/Basket.svg';
import IconBasket from './basketMaterial/BasketMaterial';

// Импортируем контексты
import { UserContext } from '../../context/userContext';

import { CardContext } from "../../context/cardContext";

// Импортируем элемент линк
import { Link, useNavigate } from "react-router-dom";

// Импортируем иконку лайка
import { ReactComponent as Like } from '../Card/like.svg';

//Импортируем иконку авторизации
import { ReactComponent as Login } from "./images/login.svg";

/* Меняем код на применение возможности вызова модального окна авторизации
export const Header = () => {
  const { currentUser, searchQuery, setSearchQuery, parentCounter } =
    useContext(UserContext);
  const [counter, setCounter] = useState(parentCounter);
  const { favorites } = useContext(CardContext);

  //console.log({ currentUser });


  useEffect(() => {
    setCounter((st) => st + 1);

    return () => setCounter(parentCounter)
  }, [parentCounter]);

  // state.push(); deprecated!!! */
  export const Header = ({ setShowModal }) => {
    const { currentUser, searchQuery, setSearchQuery, parentCounter, isAuthentificated } =
      useContext(UserContext);
    const [counter, setCounter] = useState(parentCounter);
    const { favorites } = useContext(CardContext);
  
    useEffect(() => {
      setCounter((st) => st + 1);
      return () => setCounter(parentCounter);
  }, [parentCounter]);

 const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='header' id='head'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div>
            {/* <Basket /> */}
            <IconBasket count={counter} />
          </div>
          <div>
            {/* Добавили через роут ссылку на Избранное */}
            <Link to={"/favorites"} className="header__bubble-link">
              <Like className="header__liked" />
              {favorites.length !== 0 && <span className="header__bubble">{favorites.length}</span>}
              {/* {favorites.length} */}
            </Link>
          </div>
          {!isAuthentificated ? <Link to={"/login"} className="header__link" onClick={() => setShowModal(true)}>
            <Login />
          </Link> :
            <span onClick={handleLogout}>logout</span>
          }
          <div>
          <span>{currentUser.email} {' '}</span>
          <span>{currentUser.about}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Шпаргалка

// useEffect(()=>{}) - update на каждое изменение компонента.
// useEffect(()=>{},[state]) - update на каждое изменение конкретного state.
// useEffect(()=>{},[]) - update в самом начале
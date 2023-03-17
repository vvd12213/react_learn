import React from 'react';

// Подключаем контекст
import {UserContext} from '../../context/userContext';

// Подключаем картинку лайка

import { ReactComponent as Like } from './like.svg';
// Подключаем стили компонента карточки
import './index.css';

// Подключаем хук

import { Link } from 'react-router-dom';

// Импортируем выборку избранного

import { findLike } from '../../utils/utils';

// Данные товара в карточке props,props.card деструктурировали item и получили из него значения. Здесь имеются данные о пользователе, это пот ом позволит фильтровать вывод по своим товарам

export const Card = ({
  product,
  pictures,
  name,
  discount,
  price,
  setParentCounter,
  onProductLike,
}) => {
  const {currentUser} = React.useContext(UserContext);
  
  const isLiked = findLike(product, currentUser)
  const handleLikeClick = () => {
    onProductLike(product);
  };
  return (
    <div className='card'>
      <div className='card__sticky card__sticky_type_top-left'>
        <span className='card__discount'>{discount}%</span>
      </div>
      <div className='card__sticky card__sticky_type_top-right'>
        <button
          className={`card__favorite ${isLiked ? 'card__favorite_active' : 'card__favorite_not_active'}`}
          onClick={handleLikeClick}
        >
          <Like className='card__liked' />
        </button>
      </div>
      <Link to={`/product/${product._id}`} className='card__link'>
        <img src={pictures} alt='card__image' className='card__image' />
        <div className='card__desc'>
          <span className='card__price'>{price}p</span>
          <span className='card_wight'>1pc</span>
          <p className='card__name'>{name}</p>
        </div>
      </Link>
      <span
        onClick={() => setParentCounter((state) => state + 1)}
        className='card__card btn btn_type_primary'
      >
        В корзину
      </span>
    </div>
  );
};
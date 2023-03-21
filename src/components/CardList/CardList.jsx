// Импортируем хук контекста

import { useContext } from 'react';

// Подключаем компонет карточки
import { Card } from '../Card/Card';

// Подключаем хуки

// import { useEffect, useState } from 'react';



// Подключаем стили
import './index.css';

// Подключаем контекст

import { CardContext } from '../../context/cardContext'

// Подключаем базу товаров
//import data from '../../data/data.json'; отключили json с товарами переходим на api




// Формируем grid с товарами Здесь имеются данные о пользователе, это пот ом позволит фильтровать вывод по своим товарам

export const CardList = ({cards}) => {

  const { setParentCounter, handleProductLike } = useContext(CardContext)
  console.log(cards)
 
  return (
    <div className='cards'>
      {cards.map((item) => {
        return (
          <Card
            product={item}
            onProductLike={handleProductLike}
            setParentCounter={setParentCounter}
            {...item}
            key={item._id}
          />
        );
      })}
    </div>
  );
};
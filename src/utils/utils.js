// Импортируем стандартные хуки

import { useEffect, useState } from "react";

// Опрдеделяем падеж слова "товар"

export const getIssues = (numb) => {
  const tmp = numb % 10;
  if (tmp === 1) return ' товар';
  if (tmp > 1 && tmp < 5) return ' товара';
  if (tmp > 4 || !numb) return ' товаров';
};



export const useDebounce = (searchQuery, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(searchQuery);
 // console.log({ searchQuery });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchQuery);
    }, delay);

    console.log({ timeout });

    return () => clearTimeout(timeout);
  }, [searchQuery]);
  return debounceValue;
};

// Подключили выборку по избранному
export const findLike = (product, currentUser) =>
  product?.likes?.some((el) => el === currentUser._id);
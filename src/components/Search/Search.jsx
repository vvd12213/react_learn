// Формируем поле поиска по товарам

import './style.css'; // подключаем стили для поля поиска

//Формируем тег input для поля поиска
export const Search = ({ setSearchQuery, searchQuery }) => {
  return (
    <input
      placeholder='Поиск'
      onChange={(e) => setSearchQuery(e.target.value)}
      className='search__input'
      value={searchQuery}
    />
  );
};
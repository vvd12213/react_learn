//Компонент логотипа

import logoSrc from './logo.svg'; //подключаем картинку логотипа
import './index.css'; //подключаем стили

//формируем представление тега логотипа
export const Logo = () => {
  return (
    <a href='/'>
      <img src={logoSrc} alt='логотип магазина' className='logo-pic' />
    </a>
  );
};
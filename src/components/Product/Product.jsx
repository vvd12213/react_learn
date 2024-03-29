// CSS
import s from './index.module.scss';

// Logotypes
import truck from './img/truck.svg';
import quality from './img/quality.svg';

// Импорт библиотеки ваний классов после коменады npm i classnames
import cn from 'classnames';

// Logo
import { ReactComponent as Save } from './img/save.svg';

// Хуки
import { useContext, useEffect, useState } from 'react';
import { api } from '../../utils/api';

// Подключили хуки роутинга
import { useLocation, useMatches, useNavigate, useParams } from 'react-router-dom';

// Подключили контекст
import { UserContext } from '../../context/userContext';

// Подключаем выборку избранного

import { findLike } from "../../utils/utils";

// Импортируем рейтинг

import { Rating } from "../Rating/Rating";

//import { useParams } from 'react-router-dom';

//const product_id = '63ecf77059b98b038f77b65f';

export const Product = ({ id }) => {
  const [product, setProduct] = useState({});
  const [rate, setRate] = useState(3);
  const [currentRating, setCurrentRating] = useState(0);
  useEffect(() => {
    api.getProductById(id).then((data) => setProduct(data));
  }, [id]);

  const navigate = useNavigate();
// Поменяли пропсы на контекст
  
  const currentUser = useContext(UserContext);

  const isLiked = findLike(product, currentUser)
  // const clicker = () => {
  //   api.addLike().catch((res) =>
  //       res.status === 403 ?   navigate('/') : navigate('/login')
  //   )
  // }

  const location = useLocation();
  const params = useParams();

  // console.log({ navigate, location, params });
  useEffect(() => {
   /* if (location.search.includes("budget=3000")) {
      // navigate('/part1')
      // alert('you are really rich man');
    } 
  }, []*/
  if (!product?.reviews) return;
    const rateAcc = (product.reviews.reduce((acc, el) => acc = acc + el.rating, 0));
    const accum = (Math.floor(rateAcc / product.reviews.length))
    setRate(accum);
    setCurrentRating(accum)
  }, [product?.reviews]
  );

  // Возвращаем макет карточки товара
  return ( 
    <>
      <div>
      {/* Добавили в карточку рейтинг товара */}
        <span className='auth__info' onClick={() => navigate(-1)}> {'< '} Назад</span>
        <h1>{product.name}</h1>
        <div className={s.rateInfo}>
          <span>Art <b>2388907</b></span>
          <Rating rate={rate} setRate={setRate} currentRating={currentRating}/>
          <span>{product?.reviews?.length} отзывов</span>
        </div>
      </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt={`Изображение`} />
          {product.tags?.map((e) => (
            <span className={`tag tag_type_${e}`}>{e}</span>
          ))}
        </div>
        <div className={s.desc}>
          <span className={s.price}>{product.price}&nbsp;₽</span>
          {!!product.discount && (
            <span className={`${s.price} card__price_type_discount`}>
              {product.discount}&nbsp;%
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <a href='/#' className={`btn btn_type_primary ${s.cart}`} onClick={() => navigate('/product/63e8a48959b98b038f77b52f')}>
              В корзину
            </a>
          </div>
          <button className={cn(s.favorite, { [s.favoriteActive]: isLiked })}>
            <Save />
            <span>{isLiked ? 'В избранном' : 'В избранное'}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt='truck' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt='quality' />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <div>{product.description}</div>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            {/*<p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
          <p>Следует учесть высокую калорийность продукта.</p> */}
          </div>
        </div>
      </div>
    </>
  );
};
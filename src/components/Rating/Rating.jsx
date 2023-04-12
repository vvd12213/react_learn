
// Импортируем хуки

import { useEffect, useState } from "react";

// Импортируем звездочки
import { ReactComponent as Star } from "./star.svg";

// Импортируем элемент cn
import cn from "classnames";
import s from './index.module.css'

export const Rating = ({ rate, setRate, currentRating, isEditable = false }) => {
    // создаем пустые реакт фрагменты, чтобы потом в них положить свг
    const emptyFragments = new Array(5).fill(<></>);
    const [ratingArr, setRatingArr] = useState(emptyFragments);

// меняем звездочки от рейтинга
    const changeDisplay = (rate) => {
        setRate(rate)
    }
// меняем рейтинг
    const changeRating = (r) => {
        setRate(r);
    }

    useEffect(() => {
        const updatedArray = ratingArr.map((ratingEl, index) =>
            
        
            <Star
                className={cn(s.star, {
                    [s.filled]: index < rate
                })}
                onMouseEnter={() => changeDisplay(index + 1)}
                onMouseLeave={() => changeDisplay(rate)}
                onClick={() => changeRating(index + 1)}
            />);
            {/* Меняем звездочки  */}
        setRatingArr(updatedArray);
    }, [rate]);

    return (
        <div>
            {ratingArr.map((e, i) => (
                <span key={i}>{e}</span>
            ))}
        </div>
    );
};

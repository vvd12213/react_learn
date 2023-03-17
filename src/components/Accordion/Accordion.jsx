import cn from "classnames";
import { useState } from "react";
import s from "./index.module.css";
//подключили иконки плюс и минус
import { ReactComponent as Minus } from "./icMinus.svg";
import { ReactComponent as Plus } from "./icPlus.svg";

export const Accordion = ({ children, title }) => {
  const [selected, setSelected] = useState(false);

  const toggleState = () => {
    setSelected((state) => !state);
  };
  return (  
    //Формируем аккордион
    <div className={cn(s.accordion, { [s.active]: selected })}>
      <button className={s.accordionButton} onClick={() => toggleState()}>
          <p className={s.title}>{title}</p>
      </button>
      <div className={s.content}>
        <p className={s.text}>{children}</p>
      </div>
    </div>
  );
};
import cn from "classnames";
import "./index.css";


// Формируем модальное окно
export const Modal = ({ activeModal, children, setShowModal }) => {
  return (
    <>
      {/* Закрытие закрытия модального окна при клике вне поля модального окна */}
      <div
        className={cn("modal", { ["active"]: activeModal })}
        onClick={() => setShowModal(false)}
        
      >
        {/* Блокирование закрытия модального окна при клике на нем, модальное окно закрывается только при клике вне его поля */}
        <div
          className={cn("modal_content", { ["active"]: activeModal })}
          onClick={(e) => e.stopPropagation()}
          
        >
          {children}
        </div>
      </div>
    </>
  );
};

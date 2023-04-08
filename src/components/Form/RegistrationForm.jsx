// ИТмпортируем хуки

import { useState } from "react";

// Установили через нпм сначала хук формы
import { useForm } from "react-hook-form";

import "./index.scss";

// const handleSubmit = (onSubmit) => {
//     // smth -> data
//     onSubmit(data)
// }

// Функция постргоения регистрационной формы с приемом и отправкой ее данных

export const RegistrationForm = ({ sendData, flag = true }) => {
  const [type, setType] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ data });
    sendData(data);
  };

  // Устанавливаем критерии ввода для полей ввода
  const nameRegister = {
    required: {
      value: flag,
      message: "Это поле обязательно",
    },
    minLength: {
      value: 2,
      message: "Такое short - короткое имя нельзя",
    },
  };

  console.log({ errors });

  // Собираем форму регистрации с полями
  return (
    <>
      <div style={{ padding: "50px" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3>Регистрация</h3>
          <input
            type="text"
            {...register("name", nameRegister)}
            placeholder="Имя"
            className="form__input"
          />
          {errors?.name && (
            <span style={{ color: "red" }}>{errors.name?.message}</span>
          )}
          <input
            type="text"
            {...register("email")}
            placeholder="email"
            className="form__input"
          />
          <div className="form__eye-wrapper">
            <input
              type={type ? "text" : "password"}
              {...register("password", {
                required: "password is required",
                // Критерии ввода пароля - допустимые знаки
                pattern: {
                  message:
                    "Пароль должен содержать минимум 8 символов, одну букву латинского алфавита и одну цифру",
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                },
              })}
              placeholder="введите пароль"
              className="form__input"
            />
            <span className="form__eye" onClick={() => setType(!type)}>
              {type ? "скрыть" : "показать"}
            </span>
          </div>
          {errors?.password && (
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          )}
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    </>
  );
};

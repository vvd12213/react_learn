import { useState } from "react";
import "./index.scss";



export const Form = ({sendData}) => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    console.log(e);
    // В одном сейте собрали данные формы по всем ключам
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    // if (e.target.name === 'name') {
    //     setContactInfo({ ...contactInfo, name: e.target.value })
    // }
    // if (e.target.name === 'lastName') {
    //     setContactInfo({ ...contactInfo, lastName: e.target.value })
    // }
    // if (e.target.name === 'phoneNumber') {
    //     setContactInfo({ ...contactInfo, phoneNumber: e.target.value })
    // }
  };
  const submitForm = (e) => {
    e.preventDefault();
    sendData(contactInfo);
  };

  console.log({ contactInfo });

  return (
    <>
      <div style={{ padding: "50px" }}>
        {/*Собираем форму */}
        <form onSubmit={submitForm} className="form">
          {/* Поле ввода имя */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contactInfo.name}
            onChange={handleChange}
            className="form__input"
          />
          {/* Поле ввода фамилия */}
          <input
            type="text"
            name="lastName"
            placeholder="lastName"
            value={contactInfo.lastName}
            onChange={handleChange}
            className="form__input"
          />
          {/* Поле ввода телефон */}
          <input
            type="number"
            name="phoneNumber"
            placeholder="phoneNumber"
            value={contactInfo.phoneNumber}
            onChange={handleChange}
            className="form__input"
          />
          {/* Кнопка обработки формы - отправка данных  */}
          <button className="btn" onClick={submitForm}>
            click
          </button>
        </form>
      </div>
    </>
  );
};

// const form = useForm()

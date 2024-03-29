// Подключаем аккордион

import { Accordion } from "../../components/Accordion/Accordion";

// Массив объектов 

const dataFaq = [
  {
    title: "Прикол про аккордион",
    content:
      "У нас дача на берегу азовского моря. Через Таганрогский залив на другом берегу в хорошую погоду видны очертания города Таганрога. Как-то один человек, измученный нарзаном, говорит:'Вон видна труба завода Тагмет, а на ней сидит кот, и на баяне играет'. Через какое-то время я поехал в Таганрог по работе, звоню брату жены и говорю ему 'Еду мимо Тагмета, а мне кот с трубы орет: Вы чего там у себя на даче все слепые? Где вы видели у меня баян? Я на аккордионе играю'",
  },
  {
    title: "Сплочённость команды профессионалов позволила расправить крылья?",
    content:
      "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами.",
  },
  {
    title: "Очевидцы сообщают, что слышали ласковый перезвон вертикали власти?",
    content:
      "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами.",
  },
  {
    title: "Консультация с широким активом продолжает удивлять?",
    content:
      "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами.",
  },
  {
    title:
      "Франция намерена исследовать, почему был сорван доклад председателя совхоза?",
    content:
      "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами.",
  },
  {
    title:
      "Курс на социально-ориентированный национальный проект попахивает безумием?",
    content:
      "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами.",
  },
  {
    title: "Постоянный количественный рост определил дальнейшее развитие?",
    content:
      "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами.",
  },
  {
    title: "Мелочь, а приятно: ночь оказалась долгой?",
    content:
      "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами.",
  },
  {
    title:
      "Есть над чем задуматься: сознание наших соотечественников не замутнено пропагандой?",
    content:
      "Прежде всего, дальнейшее развитие различных форм деятельности предоставляет широкие возможности для дальнейших направлений развития. В своём стремлении повысить качество жизни, они забывают, что семантический разбор внешних противодействий представляет собой интересный эксперимент проверки инновационных методов управления процессами.",
  },
];


// Функция формирования страницы FAQ

export const FaqPage = () => {
  return (
    <div>
      <h1>Часто спрашивают</h1>
      {/* Из массива объектов по каждому объекту формируем аккордион по каждому пункту FAQ  */}
      {dataFaq.map((e, i) => (
        <Accordion key={i} title={e.title}>
          {e.content}
        </Accordion>
      ))}
    </div>
  );
};

// [].map((element) => {
//   return element;
// });
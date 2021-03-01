import {ProductModel, Categorys} from '../models';

export const productsMock: ProductModel[] = [
  {
    id: 1,
    name: 'Ноутбук ASUS VivoBook E402YA-FA031T',
    description: 'Доступный по стоимости ноутбук окажется лучшим вариантом для решения большинства повседневных задач. Производитель оснастил его экраном, диагональ которого составляет 14 дюймов, а максимальное разрешение равно 1920×1080. Также, для повышения комфорта работы, имеется удобная светодиодная подсветка экрана. За оптимальную производительность для решения повседневных задач отвечает двухъядерный процессор AMD E2 7015.',
    price: 25000,
    category: Categorys.computers,
    isAvailable: true,
    imageURL: '../../assets/img/catalog/noutbuk-asus.jpg'
  },
  {
    id: 2,
    name: 'Телевизор XIAOMI Mi TV 4S 50',
    description: '50-дюймовый LED телевизор. Настоящее воплощение стиля и роскоши. Черный корпус и лаконичная подставка вписываются в интерьер каждого дома. Технология HDR делает изображение еще живее, реалистичнее и сочнее. Представленная модель поддерживает Smart TV, а это просмотр видео, скачивание музыки, игры и общение в интернете. Встроенный Wi-Fi позволяет транслировать UHD-контент.',
    price: 30000,
    category: Categorys.tvs,
    isAvailable: true,
    imageURL: '../../assets/img/catalog/xiaomi-mi-tv.jpg'
  },
  {
    id: 3,
    name: 'Смартфон XIAOMI Poco X3 128Gb, синий',
    description: 'Заряда аккумулятора емкостью 5160 мАч хватит на 2 дня автономной работы. Для хранения контента предусмотрено 128 Гб встроенной памяти. При этом при желании вы можете установить карту памяти формата microSD объемом до 256 Гб. Пластиковый корпус смартфона защищен от влаги и пыли, а экран имеет защитное покрытие от царапин. Для разблокировки устройства предусмотрены сканер лица и сканер отпечатка пальца.',
    price: 22000,
    category: Categorys.smartphones,
    isAvailable: true,
    imageURL: '../../assets/img/catalog/xiaomi-poco-x3.jpg'
  },
  {
    id: 4,
    name: 'Настольный набор GOOD SUNRISE K7D-35A',
    description: 'Состав набора (7 предметов):	подкладка на стол 66 х 43 см, подставка для ручек с 2 ручками, подставка для записок, подставка для визиток, нож для бумаг, подставка для пишущих принадлежностей, лоток для бумаг с двумя отделениями.',
    price: 5100,
    category: Categorys.stationery,
    isAvailable: false,
    imageURL: '../../assets/img/catalog/good-sunrise-k7d.jpg'
  },
  {
    id: 5,
    name: 'Кастрюля TEFAL Intuition A7024485, 2.9л, с крышкой',
    description: 'Кастрюля из полированной нержавеющей стали с закрытыми ненагревающимися ручками и удобными краями для слива. Имеется внутренняя градуировка. Подходит для любого источника тепла, включая индукцию. Диаметр дна кастрюли 17,5 см.',
    price: 1900,
    category: Categorys.dishes,
    isAvailable: true,
    imageURL: '../../assets/img/catalog/tefal-intuition-a7024485.jpg'
  }
];

export const productEmptyMock: ProductModel = {
  id: null,
  name: '',
  description: '',
  price: null,
  category: null,
  isAvailable: true,
  imageURL: ''
};

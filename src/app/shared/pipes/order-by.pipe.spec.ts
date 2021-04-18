import { OrderByPipe } from './order-by.pipe';

const sourceMockSData = [
  {
    "name": "Кастрюля TEFAL Intuition A7024485, 2.9л, с крышкой",
    "price": 3800,
    "quantity": 3
  },
  {
    "name": "Телевизор XIAOMI Mi TV 4S 50",
    "price": 30000,
    "quantity": 2
  },
  {
    "name": "Смартфон XIAOMI Poco X3 128Gb, синий",
    "price": 22000,
    "quantity": 1
  }
]

const sortedByNameInAscData = [
  {
    "name": "Кастрюля TEFAL Intuition A7024485, 2.9л, с крышкой",
    "price": 3800,
    "quantity": 3
  },
  {
    "name": "Смартфон XIAOMI Poco X3 128Gb, синий",
    "price": 22000,
    "quantity": 1
  },
  {
    "name": "Телевизор XIAOMI Mi TV 4S 50",
    "price": 30000,
    "quantity": 2
  }
]

const sortedByPriceInAscData = sortedByNameInAscData;

const sortedByNameInDesData = [
  {
    "name": "Телевизор XIAOMI Mi TV 4S 50",
    "price": 30000,
    "quantity": 2
  },
  {
    "name": "Смартфон XIAOMI Poco X3 128Gb, синий",
    "price": 22000,
    "quantity": 1
  },
  {
    "name": "Кастрюля TEFAL Intuition A7024485, 2.9л, с крышкой",
    "price": 3800,
    "quantity": 3
  }
]


describe('Pipe: OrderBye', () => {
  const pipe = new OrderByPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('objects must be sorted by ascending name', () => {
    expect(pipe.transform(sourceMockSData, 'name', true)).toEqual(sortedByNameInAscData);
  });

  it('objects must be sorted by descending name', () => {
    expect(pipe.transform(sourceMockSData, 'name')).toEqual(sortedByNameInDesData);
  });

  it('objects must be sorted by ascending price', () => {
    expect(pipe.transform(sourceMockSData, 'price', true)).toEqual(sortedByPriceInAscData);
  });
});

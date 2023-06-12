import { createCar } from 'rest_api/controllers/cars';
import { deleteCars } from 'rest_api/controllers/cars';
import { updateCars } from 'rest_api/controllers/cars';
import { showCars } from 'rest_api/controllers/cars';
import { showCar } from 'rest_api/controllers/cars';
import { cars } from 'rest_api/controllers/cars'; 

import request from 'supertest';

import app from 'rest_api/index'

//1
describe('createCarTest', () => {
  beforeEach(() => {
    cars.length = 0; //czyszczenie listy przed testem 
  });

  test('Powinien dodać nowy samochód do listy.', () => {
    const req = {
      body: {
        marka: 'Ford',
        model: 'Mustang',
        generacja: 'V',
      },
    };
    const res = {
      send: jest.fn(),
    };

    createCar(req, res);

    expect(res.send).toHaveBeenCalled();
    expect(cars.length).toBe(1);
    expect(cars[0].marka).toBe('Ford');
    expect(cars[0].model).toBe('Mustang');
    expect(cars[0].generacja).toBe('V');
  });
});

//2
describe('deleteCarsTest', () => {
  beforeEach(() => {
    cars.length = 0; //czyszczenie listy 

    //dodawanie kilku losowych modeli do listy
    cars.push(
      { id: '1', marka: 'Ford', model: 'Mustang', generacja: 'V' },
      { id: '2', marka: 'Chevrolet', model: 'Camaro', generacja: 'VI' },
      { id: '3', marka: 'Dodge', model: 'Challenger', generacja: 'V' }
    );
  });

  test('Powinien usuwać samochód z listy na podstawie ID', () => {
    const req = {
      params: {
        id: '2', //wybrany nr id do usunięcia
      },
    };
    const res = {
      send: jest.fn(),
    };

    deleteCars(req, res);

    expect(res.send).toHaveBeenCalledWith('Samochód o id 2 został usunięty z bazy danych!');
    expect(cars.length).toBe(2); //id 2 powinno zostac usuniete
    expect(cars.find((car) => car.id === '2')).toBeUndefined(); //nie powinno zostac odnalezione
  });
});


//3
describe('updateCarsTest', () => {
  beforeEach(() => {
    cars.length = 0; // czyszczenie listy

    //dodawanie modelu 
    cars.push({ id: '1', marka: 'Ford', model: 'Mustang', generacja: 'V' });
  });

  test('Powienien aktualizować dane o samochodzie za pomocą ID', () => {
    const req = {
      params: {
        id: '1', //wskazanie id modelu do updatu
      },
      body: {
        marka: 'Chevrolet', //nowe dane
        model: 'Camaro',
        generacja: 'VI',
      },
    };
    const res = {
      send: jest.fn(),
    };

    updateCars(req, res);

    expect(res.send).toHaveBeenCalledWith('Dane samochodu o numerze id 1 zostały zmodyfikowane.');
    expect(cars.length).toBe(1); //liczba aut na liscie nie powinna sie zmienic 
    expect(cars[0].marka).toBe('Chevrolet'); 
    expect(cars[0].model).toBe('Camaro'); 
    expect(cars[0].generacja).toBe('VI'); 
  });
});

//4
describe('showCarTest', () => {
  beforeEach(() => {
    cars.length = 0; //czyszczenie listy jak wszedzie

    //losowe auta dla testu
    cars.push({ id: '1', marka: 'Ford', model: 'Mustang', generacja: 'V' });
    cars.push({ id: '2', marka: 'Chevrolet', model: 'Camaro', generacja: 'VI' });
  });

  test('Powinien zwrócić samochód o określonym ID', () => {
    const req = {
      params: {
        id: '2', //auto do zwrocenia
      },
    };
    const res = {
      send: jest.fn(),
    };

    showCar(req, res);

    expect(res.send).toHaveBeenCalledWith({ id: '2', marka: 'Chevrolet', model: 'Camaro', generacja: 'VI' });
  });
});


//5
describe('deleteCarsTest', () => {
  beforeEach(() => {
    cars.length = 0;

    cars.push(
      { id: '1', marka: 'Ford', model: 'Mustang', generacja: 'V' },
      { id: '2', marka: 'Chevrolet', model: 'Camaro', generacja: 'VI' },
      { id: '3', marka: 'Dodge', model: 'Challenger', generacja: 'V' }
    );
  });

  test('Powinno usunąć samochód z listy na podstawie ID', () => {
    const req = {
      params: {
        id: '2',
      },
    };
    const res = {
      send: jest.fn(),
    };

    deleteCars(req, res);

    expect(res.send).toHaveBeenCalledWith('Samochód o id 2 został usunięty z bazy danych!');
    expect(cars.length).toBe(2);
    expect(cars.find((car) => car.id === '2')).toBeUndefined();
  });

  test('Nie powinno usuwać żadnego samochodu, gdy podane ID nie zostanie znalezione', () => {
    const req = {
      params: {
        id: '4',
      },
    };
    const res = {
      send: jest.fn(),
    };

    deleteCars(req, res);

    expect(res.send).toHaveBeenCalledWith('Nie znaleziono samochodu o id 4 w bazie danych!');
    expect(cars.length).toBe(3);
  });
});

//6
describe('updateCarsTest', () => {
  beforeEach(() => {
    cars.length = 0;
    cars.push({ id: '1', marka: 'Ford', model: 'Mustang', generacja: 'V' });
  });

  test('Nie powinno zmieniać danych o samochodzie jesli jego ID nie istnieje', () => {
    const req = {
      params: {
        id: 'nonexistent-id',
      },
      body: {
        marka: 'Chevrolet',
        model: 'Camaro',
        generacja: 'VI',
      },
    };
    const res = {
      send: jest.fn(),
    };

    updateCars(req, res);

    expect(res.send).toHaveBeenCalledWith('Nie znaleziono samochodu o numerze id nonexistent-id w bazie danych.');
    expect(cars.length).toBe(1);
    expect(cars[0].marka).toBe('Ford');
    expect(cars[0].model).toBe('Mustang');
    expect(cars[0].generacja).toBe('V');
  });
});

//7
describe('createCarTest', () => {
  beforeEach(() => {
    cars.length = 0; //czyszczenie listy znowu:)
  });

  test('Powinien dodawać nowy samochod do listy', () => {
    const req = {
      body: {
        marka: 'Ford',
        model: 'Mustang',
        generacja: 'S550',
      },
    };
    const res = {
      send: jest.fn(),
    };

    createCar(req, res);

    expect(res.send).toHaveBeenCalledWith('Samochód marki Ford został dodany do bazy danych!');
    expect(cars.length).toBe(1);
    expect(cars[0].marka).toBe('Ford');
    expect(cars[0].model).toBe('Mustang');
    expect(cars[0].generacja).toBe('S550');
  });

  test('Powinien zwrócić komunikat o błędzie, jeśli brakuje wymaganych danych samochodu', () => {
    const req = {
      body: {
        marka: 'Ford',
        // model i generacja są pominięte
      },
    };
    const res = {
      send: jest.fn(),
    };

    createCar(req, res);

    expect(res.send).toHaveBeenCalledWith('Nie udało się dodać samochodu. Brak wymaganych szczegółów.');
    expect(cars.length).toBe(0); // Żaden samochód nie powinien zostać dodany do listy
  });
});

//8
test('Nie powienien dodawać do listy jeśli brakuje jakichś danych', () => {
  const req = {
    body: {
      marka: 'Ford',
      generacja: 'V',
    },
  };
  const res = {
    send: jest.fn(),
  };

  createCar(req, res);

  expect(res.send).toHaveBeenCalledWith('Nie udało się dodać samochodu. Brak wymaganych szczegółów.');
});





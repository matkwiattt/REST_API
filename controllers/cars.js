import { v4 as uuidv4 } from 'uuid';


//let oznacza, że lista jest modyfikowalna 
let cars = [];



export const showCars = (req, res) => {
    if (cars.length == 0 ) {
      res.send('Lista samochodów jest pusta.');
    } else {
      res.send(cars);
    }
  };
  


export const createCar = (req, res) => {
    const { marka, model, generacja } = req.body;
  
    if (!marka || !model || !generacja) {
      res.send('Nie udało się dodać samochodu. Brak wymaganych szczegółów.');
      return;
    }
  
    const car = {
      marka,
      model,
      generacja,
      id: uuidv4(),
    };
  
    cars.push(car);
  
    res.send(`Samochód marki ${car.marka} został dodany do bazy danych!`);
  };
  

export const showCar = (req, res) => {
    const {id} = req.params;

    const foundCar = cars.find((car) => car.id == id);

    res.send(foundCar);
}

export const deleteCars = (req, res) => {
    const { id } = req.params;
    const carIndex = cars.findIndex((car) => car.id === id);
  
    if (carIndex !== -1) {
      cars.splice(carIndex, 1);
      res.send(`Samochód o id ${id} został usunięty z bazy danych!`);
    } else {
      res.send(`Nie znaleziono samochodu o id ${id} w bazie danych!`);
    }
  };

  export const updateCars = (req, res) => {
    const { id } = req.params;
    const { marka, model, generacja } = req.body;
    const carIndex = cars.findIndex((car) => car.id === id);
  
    if (carIndex !== -1) {
      const car = cars[carIndex];
  
      if (marka) car.marka = marka;
      if (model) car.model = model;
      if (generacja) car.generacja = generacja;
  
      res.send(`Dane samochodu o numerze id ${id} zostały zmodyfikowane.`);
    } else {
      res.send(`Nie znaleziono samochodu o numerze id ${id} w bazie danych.`);
    }
  };
  


export { cars };
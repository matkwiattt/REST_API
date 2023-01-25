import { v4 as uuidv4 } from 'uuid';


//let oznacza, że lista jest modyfikowalna 
let cars = [];


export const showCars = (req, res) => {
    res.send(cars);
}


export const createCar = (req, res) => {

    const car = req.body;

    cars.push({... car, id: uuidv4() });

    res.send(`Samochód marki ${car.marka} został dodany do bazy danych!`);
};

export const showCar = (req, res) => {
    const {id} = req.params;

    const foundCar = cars.find((car) => car.id == id);

    res.send(foundCar);
}

export const deleteCars = (req, res) => {

    const {id} = req.params;

    cars = cars.filter((car) => car.id !== id) ;

    res.send(`Samochód o id ${id} został usunięty z bazy danych!`);

};

export const updateCars = (req, res) => {
    const {id} = req.params;
    const {marka, model, generacja} = req.body;
    const car = cars.find((car) => car.id == id);

    if(marka) car.marka = marka;

    if(model) car.model = model;

    if(generacja) car.generacja = generacja;

    res.send(`Dane samoxhodu o numerze id ${id} zostały zmodyfikowane. `);

};
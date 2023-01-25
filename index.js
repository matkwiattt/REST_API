
import express from "express";
import bodyParser from 'body-parser';

import carsRoutes from './routes/cars.js';
//import mongoose from "mongoose";

//mongoose.connect("mongodb+srv://mk31032001:mk31032001@restapi.mtnjl5g.mongodb.net/?retryWrites=true&w=majority");


const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/cars', carsRoutes);

app.get('/', (req, res) => {res.send('Pozdrawiam ze strony głównej')});

app.listen(PORT, () => console.log(`Serwer Pracuje na porcie: http://localhost:${PORT}`));




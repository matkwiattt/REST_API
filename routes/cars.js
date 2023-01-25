import express from  'express';

import { createCar, deleteCars, showCars, showCar,  updateCars } from '../controllers/cars.js';

const router = express.Router();

router.get('/', showCars);

router.post('/', createCar);

router.get('/:id', showCar);

router.delete('/:id', deleteCars);

router.patch('/:id', updateCars);

export default router;
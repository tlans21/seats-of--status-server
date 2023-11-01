const express = require('express');
const router = express.Router();
const seatController = require('../../controllers/seatController.js');

router.put("/updateRestaurant", seatController.updateRestaurant);

router.post("/createRestaurant", seatController.createRestaurant);

router.post("/readRestaurant", seatController.readRestaurant);

module.exports = router;
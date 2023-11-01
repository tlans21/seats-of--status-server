const express = require('express');
const router = express.Router();
const apiRoutes = require('./api/apiRoutes.js');
const {tokenCheck} = require('../controllers/TokenMiddleware.js');


router.use("/api", tokenCheck, apiRoutes);

module.exports = router;
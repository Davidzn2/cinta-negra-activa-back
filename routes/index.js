const express = require('express')

const router = express.Router();

router.use(require('./UserRoutes'));

module.exports = router;
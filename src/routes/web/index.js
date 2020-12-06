const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./../../../storage/app/swagger_output.json');

router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = router;
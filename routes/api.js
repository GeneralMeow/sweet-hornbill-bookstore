const express = require('express');
const router = express.Router();
const queries = require('../queries')

router.put('/update', function( request, response ) {
  response.send(request.body)
})

module.exports = router;

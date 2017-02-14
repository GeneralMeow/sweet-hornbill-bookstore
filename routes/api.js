const express = require('express');
const router = express.Router();
const queries = require('../queries')

router.put('/update', function( request, response ) {
  queries.updateBook(request.body)
    .then( returnVal => {
      console.log("api log:", returnVal)
      response.send(returnVal)
    })
})

module.exports = router;

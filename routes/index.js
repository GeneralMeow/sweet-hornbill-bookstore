const express = require('express');
const router = express.Router();
const queries = require('../queries')



router.get('/', function( request, response, next ) {
  queries.getAllBooks()
    .then( data => {
      response.render('index', {
        title: 'Sweet Hornbill Bookstore',
        books: data
      });
    })
})
module.exports = router;

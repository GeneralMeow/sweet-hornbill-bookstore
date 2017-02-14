const express = require('express');
const router = express.Router();
const queries = require('../queries')

router.get('/', function( request, response, next ) {
  queries.getAllBooks()
    .then( data => {
      response.render('admin', {
        title: 'Sweet Hornbill Bookstore - Admin Page',
        books: data
      });
    })
})

router.get('/:id', function( request, response, next ) {
  queries.getSingleBook(request.params.id)
    .then( data => {
      response.render('adminEdit', {
        title: 'Sweet Hornbill Bookstore',
        books: data
      });
    })
})

module.exports = router;

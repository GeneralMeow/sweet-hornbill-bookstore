const express = require('express');
const router = express.Router();
const queries = require('../queries')

router.get('/', function( request, response ) {
  response.redirect('/admin/1')
})

router.get('/:page', function( request, response, next ) {
  const page = request.params.page
  Promise.all([
    queries.getTenBooks(page),
    queries.getQuantityOfBooks()
  ])
    .then( values => {
      const data = values[0]
      const count = Math.trunc((values[1].count / 10) + 1)
      response.render('admin', {
        title: 'Sweet Hornbill Bookstore - Admin Page',
        books: data,
        count: count
      });
    })
})

router.get('/book/:id', function( request, response, next ) {
  queries.getSingleBook(request.params.id)
    .then( data => {
      response.render('adminEdit', {
        title: 'Sweet Hornbill Bookstore',
        books: data
      });
    })
})

module.exports = router;

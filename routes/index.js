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
    .catch(function(err) {
    return next(err)
  })
})

router.get('/book/:id', function( request, response, next ) {
  queries.getSingleBook( request, response )
    .then( data => {
      response.render('singlebook', {
        title: data.title,
        books: data
      })
    })
    .catch(function(err) {
    return next(err)
  })
})

router.get('/author/:author', function( request, response, next ) {
  queries.getSingleAuthor( request, response )
    .then( data => {
      response.render('author', {
        title: data.title,
        books: data
      })
    })
    .catch( function(err) {
      return next(err)
    })
})

router.get('/genre/:genre', function( request, response, next ) {
  queries.getSingleGenre( request, response )
    .then( data => {
      response.render('genre', {
        title: data.title,
        books: data
      })
    })
    .catch( function(err) {
      return next(err)
    })
  })



module.exports = router;

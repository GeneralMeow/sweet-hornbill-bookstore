const express = require('express')
const router = express.Router()
const queries = require('../queries')

router.get('/', ( request, response, next ) => {
  queries.getAllBooks()
    .then( data => {
      response.render('index', {
        title: 'Sweet Hornbill Bookstore',
        books: data
      })
    })
    .catch( ( err ) => {
    return next( err )
  })
})

router.get('/book/:id', ( request, response, next ) => {
  queries.getSingleBook( request, response )
    .then( data => {
      response.render('singlebook', {
        title: data.title,
        books: data
      })
    })
    .catch( ( err ) => {
    return next( err )
  })
})

router.get( '/author/:author', ( request, response, next ) => {
  queries.getSingleAuthor( request, response )
    .then( data => {
      response.render( 'author', {
        title: data.title,
        books: data
      })
    })
    .catch( ( err ) => {
      return next( err )
    })
})

router.get( '/genre/:genre', ( request, response, next ) => {
  queries.getSingleGenre( request, response )
    .then( data => {
      response.render( 'genre', {
        title: data.title,
        books: data
      })
    })
    .catch( ( err ) => {
      return next( err )
    })
  })

router.get( '/addbook', ( request, response, next ) => {
  queries.addBookPage( request, response )
    .then( data => {
      response.render( 'addbook', {
        title: data.title,
        books: data
      })
    })
    .catch( ( err ) => {
      return next( err )
    })
})

router.post( '/addbook', ( request, response, next ) => {
  const { bookId } = request.params.id
  queries.createBook( request, response )
    .then( data => {
      response.redirect( `/book/${bookId}` )
    })
    .catch( ( err ) => {
      return next( err )
    })
})


module.exports = router

const express = require('express')
const router = express.Router()
const queries = require('../queries')

router.get('/', ( request, response ) => {
  response.redirect('/1')
})

// TODO: Figure out how to add "count" to navbar, when navbar is being included not blocked out.
// Then we can have the page numbers listed along bottom of navbar where they should be, instead
// of having to style them inside the index.pug

router.get('/:page', ( request, response, next ) => {
  const page = request.params.page
  Promise.all([
    queries.getTenBooks(page),
    queries.getQuantityOfBooks()
  ])
    .then( values => {
      const data = values[0]
      const count = Math.trunc((values[1].count / 10) + 1)
      response.render('index', {
        title: 'Sweet Hornbill Bookstore',
        books: data,
        count: count
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

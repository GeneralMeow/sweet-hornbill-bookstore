const pgp = require('pg-promise')()
const connectionString = 'postgres://localhost:5432/sweethornbillbookstore'
const db = pgp(connectionString)



const getAllBooks = () => db.any( 'SELECT * FROM books' )

const getSingleBook = ( request, response ) => {
  const id = request.params.id
  return db.one('SELECT * FROM books WHERE id = $1', id)
}

const getSingleAuthor = ( request, response ) => {
  const author = request.params.author
    return db.one('SELECT * FROM books WHERE author = $1', author)
}

const getSingleGenre = ( request, response ) => {
  const genre = request.params.genre
    return db.one('SELECT * FROM books WHERE genre = $1', genre)
}







module.exports = {
  getAllBooks,
  getSingleBook,
  getSingleAuthor,
  getSingleGenre
}

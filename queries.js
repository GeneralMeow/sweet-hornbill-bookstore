const pgp = require('pg-promise')()
const connectionString = 'postgres://localhost:5432/sweethornbillbookstore'
const db = pgp(connectionString)



const getAllBooks = () => db.any( 'SELECT * FROM books' )

const getSingleBook = ( request, response ) => {
  const id = request.params.id
  return db.one('SELECT * FROM books WHERE id = $1', id)
}

const getSingleAuthor = ( request, response ) => {
    console.log('this is the request--->>>', request.params)
  const author = request.params.author
    const jamesisabutt = db.one('SELECT * FROM books WHERE author = $1', author)
    console.log('james====D', jamesisabutt)
  return jamesisabutt
}









module.exports = {
  getAllBooks,
  getSingleBook,
  getSingleAuthor
}

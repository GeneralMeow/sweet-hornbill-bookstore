const pgp = require('pg-promise')()
const connectionString = 'postgres://localhost:5432/sweethornbillbookstore'
const db = pgp(connectionString)



const getAllBooks = () => db.any( 'SELECT * FROM books' )

const getSingleBook = ( request, response ) => {
  const id = request.params.id
  db.one('SELECT * FROM books WHERE id = $1', id)
}










module.exports = {
  getAllBooks,
  getSingleBook
}

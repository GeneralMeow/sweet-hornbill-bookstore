const pgp = require('pg-promise')()
const connectionString = 'postgres://localhost:5432/sweethornbillbookstore'
const db = pgp(connectionString)

const getAllBooks = () => db.any( 'SELECT * FROM books' )

const getSingleBook = ( request, response ) => {
  const id = request.params.id
  return db.one('SELECT * FROM books WHERE id = $1', id)
}

const getSingleAuthor = ( request, response ) => {
  const author = request.params.author.toLowerCase()
    return db.any('SELECT * FROM books WHERE LOWER(author) = $1', author)
}

const getSingleGenre = ( request, response ) => {
  const genre = request.params.genre
  return db.one('SELECT * FROM books WHERE genre = $1', genre)
}


const updateBook = data => {
  return db.oneOrNone(`
    UPDATE books
    SET title=$2,
        author=$3,
        genre=$4,
        description=$5
    WHERE id = $1`, [data.id, data.title, data.author, data.genre, data.description] )
}

const addBookPage = ( request, response ) => {
  return db.any('SELECT * FROM books')
}

const createBook = ( request, response ) => {
  const { title, author, genre, description, img_url } = request.body
  return db.any(`
    INSERT INTO books( title, author, genre, description, img_url)
    VALUES( $1, $2, $3, $4, $5 )
    RETURNING *`, [title, author, genre, description, img_url])
}

module.exports = {
  getAllBooks,
  getSingleBook,
  getSingleAuthor,
  getSingleGenre,
  updateBook,
  addBook,
  addBookPage,
  createBook
}

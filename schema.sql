DROP DATABASE IF EXISTS sweethornbillbookstore;
CREATE DATABASE sweethornbillbookstore;

\c sweethornbillbookstore;


CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  author VARCHAR,
  genre VARCHAR,
  description VARCHAR,
  img_url VARCHAR
);

INSERT INTO books ( title, author, genre, description, img_url )
VALUES ( 'Parable of the Sower', 'Octavia Butler', 'Sci-Fi', 'When unattended environmental and economic crises lead to social chaos, not even gated communities are safe. In a night of fire and death Lauren Olamina, a ministers young daughter, loses her family and home and ventures out into the unprotected American landscape. But what begins as a flight for survival soon leads to something much more: a startling vision of human destiny... and the birth of a new faith.', 'https://kammbia1.files.wordpress.com/2012/07/parable-of-the-sower.jpg' );

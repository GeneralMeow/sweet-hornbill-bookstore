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

INSERT INTO books ( title, author, genre, description, img_url )
VALUES ( 'The Hitchhikers Guide to the Galaxy', 'Douglas Adams', 'Sci-Fi', 'The Earth is destroyed to make a space freeway', 'https://images-na.ssl-images-amazon.com/images/I/A1HGWCA36hL.jpg' );

INSERT INTO books ( title, author, genre, description, img_url )
VALUES ( 'The Giver', 'Lois Lowry', 'Fiction', 'Jonas receives the memories of the past, good and bad, from the current Receiver, a wise old man who tells Jonas to call him the Giver. The Giver transmits memories by placing his hands on Jonas''s bare back. The first memory he receives is of an exhilarating sled ride.', 'http://www.ravenoak.net/wp-content/uploads/2015/08/thegiver.jpg' );

CREATE TABLE merch (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  type VARCHAR(20) NOT NULL,
  price VARCHAR(20) NOT NULL,
  imgurl TEXT
);

INSERT INTO merch 
(name, type, price, imgurl)
VALUES 
('', '', '', '');
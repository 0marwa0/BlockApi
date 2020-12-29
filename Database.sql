CREATE blockapi;

CREATE TABLE item (
item_id SERIAL PRIMARY KEY,
name VARCHAR (255),
quantity VARCHAR (255),
price VARCHAR (255),
discount VARCHAR (255),
total VARCHAR (255)
);
CREATE TABLE list (
list_id SERIAL PRIMARY KEY,
creater VARCHAR (255),
currency VARCHAR (255),
total VARCHAR (255),
items VARCHAR (255),
discount VARCHAR (255),
costumerName VARCHAR (255),
recive VARCHAR (255),
restPrice VARCHAR (255),
createAt TIMESTAMP DEFAULT NOW(),
isDeleted int DEFAULT 0,
updateAt TIMESTAMP DEFAULT NOW()

);

CREATE TABLE templist (
temp_id SERIAL PRIMARY KEY,
name VARCHAR (255),
items jsonb[],
createAt TIMESTAMP DEFAULT NOW(),
updateAt TIMESTAMP DEFAULT NOW()
);
CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
name VARCHAR (255),
mode VARCHAR (255),
createAt TIMESTAMP DEFAULT NOW(),
updateAt TIMESTAMP DEFAULT NOW(),
commonItems jsonb[]
);

CREATE TABLE maintainers (
maintainers_id SERIAL PRIMARY KEY,
name VARCHAR (255),
phone VARCHAR (255),
address VARCHAR (255),
image VARCHAR (255),
backimage VARCHAR (255),
list jsonb[]
);
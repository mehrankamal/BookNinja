CREATE DOMAIN rating_domain AS INTEGER
CHECK(
    VALUE >= 1
AND VALUE <= 5
);

CREATE Table Books (
	book_isbn_10 VARCHAR(11) NOT NULL,
	title varchar(100),
	description VARCHAR(500),
	pub_date DATE,
	genre varchar(20),
	author_id INTEGER not null,
	
	UNIQUE (title),
	PRIMARY KEY (book_isbn_10)
);

CREATE TABLE Authors(
	author_id VARCHAR(11),
	author_name VARCHAR(20),
	about_author VARCHAR(500),
	
	PRIMARY KEY (author_id)
);


CREATE TABLE User_shelf(
	shelf_id SERIAL,
	user_id INTEGER,
	shelf_name VARCHAR (20),
	
	PRIMARY KEY (shelf_id)
);

CREATE TABLE Shelf_books(
	shelf_id INTEGER,
	book_isbn_10 varchar(11),

	PRIMARY KEY (shelf_id,book_isbn_10)
);

CREATE TABLE Users(
	user_id SERIAL,
	user_name VARCHAR(20),
	user_pass CHAR(60),
	user_email VARCHAR(50),
	join_date DATE NOT NULL DEFAULT CURRENT_DATE,
	user_bio VARCHAR(200) DEFAULT null,
	num_followers BIGINT DEFAULT 0,
	num_following BIGINT DEFAULT 0,
	confirmed BOOLEAN DEFAULT FALSE,
	
	PRIMARY KEY (user_id),
	UNIQUE (user_email)
);

CREATE TABLE Reviews(
	user_id INTEGER,
	book_isbn_10 VARCHAR(11),
	likes BIGINT,
	review_content VARCHAR(1024),
	post_date DATE DEFAULT CURRENT_DATE,
	rating rating_domain NOT NULL,
	
	PRIMARY KEY (user_id,book_isbn_10)
);

CREATE TABLE Orders(
	order_id SERIAL,
	user_id INTEGER,
	seller_id INTEGER,
	order_date DATE DEFAULT CURRENT_DATE,
	ship_date DATE,
	
	PRIMARY KEY (order_id)
);

CREATE TABLE Order_books(
	order_id INTEGER,
	book_isbn_10 varchar(11),
	Purchased_qty int,

	PRIMARY KEY(order_id, book_isbn_10)
);


CREATE TABLE Seller_book(
	book_isbn_10 VARCHAR(11),
	seller_id INTEGER,
	qty_stock INTEGER,
	price_Quoted MONEY,

	PRIMARY KEY(book_isbn_10, seller_id)
);

CREATE TABLE Sellers(
	seller_id SERIAL,
	seller_name VARCHAR(20),
	seller_pass CHAR(60),
	seller_email VARCHAR(50),
	join_date DATE DEFAULT CURRENT_DATE,
	seller_des VARCHAR(200),
	
	PRIMARY KEY (seller_id),
	UNIQUE (seller_email)
);

CREATE TABLE User_follows(
	user_id INTEGER,
	following_id INTEGER,
	
	PRIMARY KEY(user_id,following_id)
);


ALTER TABLE user_shelf ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE shelf_books ADD FOREIGN KEY (shelf_id) REFERENCES user_shelf(shelf_id) ON DELETE CASCADE;
ALTER TABLE shelf_books ADD FOREIGN KEY (book_isbn_10) REFERENCES books(book_isbn_10) ON DELETE CASCADE;
ALTER TABLE reviews ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE reviews ADD FOREIGN KEY (book_isbn_10) REFERENCES books(book_isbn_10);
ALTER TABLE book_authored ADD FOREIGN KEY (book_isbn_10) REFERENCES books(book_isbn_10);
ALTER TABLE book_authored ADD FOREIGN KEY (author_id) REFERENCES authors(author_id);
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE orders ADD FOREIGN KEY (seller_id) REFERENCES sellers(seller_id);
ALTER TABLE order_books ADD FOREIGN KEY (order_id) REFERENCES orders(order_id);
ALTER TABLE order_books ADD FOREIGN KEY (book_isbn_10) REFERENCES books(book_isbn_10);
ALTER TABLE seller_book ADD FOREIGN KEY (seller_id) REFERENCES sellers(seller_id);
ALTER TABLE seller_book ADD FOREIGN KEY (book_isbn_10) REFERENCES books(book_isbn_10);
ALTER TABLE user_follows ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE user_follows ADD FOREIGN KEY (following_id) REFERENCES users(user_id);
ALTER TABLE books ADD FOREIGN KEY (author_id) REFERENCES Authors(author_id);
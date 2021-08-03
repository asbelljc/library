-- Procedure: bookshelf.add_book(title TEXT, author TEXT, pages bigint, is_read bool)

CREATE OR REPLACE PROCEDURE bookshelf.add_book(title varchar(100), author varchar(100), pages bigint, is_read bool)
	LANGUAGE plpgsql
AS $procedure$
	BEGIN
    INSERT INTO bookshelf.books (title, author, pages, is_read)
    VALUES (add_book.title, add_book.author, add_book.pages, add_book.is_read);
	END;
$procedure$;

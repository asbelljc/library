-- Procedure: stocks.add_symbol(symbol text)

-- Modify this stored procedure to add book to the library.books table
CREATE OR REPLACE PROCEDURE stocks.add_symbol(symbol TEXT)
	LANGUAGE plpgsql
AS $procedure$
	BEGIN
    INSERT INTO stocks.symbols (symbol)
    VALUES (add_symbol.symbol);
	END;
$procedure$;

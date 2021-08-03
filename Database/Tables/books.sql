-- Table: bookshelf.books

-- DROP TABLE bookshelf.books;

CREATE TABLE IF NOT EXISTS bookshelf.books
(
  book_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
  title character varying(100) COLLATE pg_catalog.default NOT NULL,
  author character varying(50) COLLATE pg_catalog.default NOT NULL,
  pages bigint NOT NULL,
  is_read boolean NOT NULL,
  add_date timestamp with time zone DEFAULT timezone('EST'::text, now()),
  CONSTRAINT books_pkey PRIMARY KEY (book_id)
)

TABLESPACE pg_default;

ALTER TABLE bookshelf.books
    OWNER to cxrulqzqbtxagf;

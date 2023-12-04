CREATE TABLE customers (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    fname text NOT NULL,
    lname text NOT NULL,
    dodid integer NOT NULL CHECK (LENGTH(CAST(dodid AS TEXT)) = 10),
    phnumber text
);

INSERT INTO customers (fname, lname, dodid, phnumber) VALUES 
    ('Sylvia', 'Plath', 1234567890, '808-080-8080'),
    ('Anne', 'Sexton', 0987654321, '917-123-4343');

CREATE TABLE dfacs (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dfacname text NOT NULL,
    dfacaddress text NOT NULL,
    dfacphnumber text
);

INSERT INTO dfacs (dfacname, dfacaddress, dfacphnumber) VALUES 
    ('Warrior Inn DFAC', 'Aleshire Ave, Schofield Barracks, HI 96857', '(808) 655-1062'),
    ('Sustainment Bistro', '780 Menoher Rd, Schofield Barracks, HI 96857', '(808) 753-2842');

CREATE TABLE orders (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    customer_id integer NOT NULL REFERENCES customers,
    dfac_id integer NOT NULL REFERENCES dfacs,
    entre text NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    timestamp datetime NOT NULL
);

INSERT INTO orders (customer_id, dfac_id, entre, price, timestamp) VALUES 
    (1, 1, 'Pizza', 4.50, '2023-12-01 10:11:02'),
    (1, 2, 'Meatloaf', 9.50, '2023-12-01 16:31:47'),
    (2, 2, 'Omelet', 2.50, '2023-12-02 07:01:23'),
    (2, 2, 'Pizza', 4.50, '2023-12-02 12:15:56')

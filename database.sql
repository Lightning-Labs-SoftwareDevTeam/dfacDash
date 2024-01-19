-- drop all tables
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS dfacs CASCADE;
DROP TABLE IF EXISTS cooks CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE customers (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(25) UNIQUE NOT NULL,
    password text NOT NULL,
    fname text NOT NULL,
    lname text NOT NULL,
    dodid VARCHAR(10) NOT NULL CHECK (LENGTH(dodid) = 10),
    phone_number text,
    is_admin boolean NOT NULL DEFAULT FALSE,
    karma_score integer DEFAULT 3,
    email text CHECK (position('@' IN email) > 1),
    profile_pic text,
    created_at timestamp NOT NULL,
    updated_at timestamp,
    deleted_at timestamp
);

CREATE TABLE dfacs (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dfacname text NOT NULL,
    dfac_logo text,
    street_address text NOT NULL,
    bldg_num text,
    city text NOT NULL,
    state_abb text NOT NULL,
    zip_code integer NOT NULL,
    dfac_phnumber text,
    flash_msg1 text,
    flash_msg2 text,
    bf_hours text,
    lu_hours text,
    dn_hours text,
    bch_hours text,
    sup_hours text,
    order_timebf text,
    order_timelu text,
    order_timedn text,
    order_timebch text,
    order_timesup text,
    created_at timestamp NOT NULL,
    updated_at timestamp,
    deleted_at timestamp
);

CREATE TABLE cooks (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(25) UNIQUE NOT NULL,
    password text NOT NULL,
    fname text NOT NULL,
    lname text NOT NULL,
    is_manager boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE items (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dfac_id integer NOT NULL REFERENCES dfacs(id),
    menu_item text NOT NULL,
    description text NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    meta_tag text,
    availability boolean NOT NULL DEFAULT TRUE
);

CREATE TABLE orders (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    customer_id integer NOT NULL REFERENCES customers,
    dfac_id integer NOT NULL REFERENCES dfacs,
    price DECIMAL(5, 2) NOT NULL,
    comments text,
    to_go boolean NOT NULL DEFAULT TRUE,
    order_timestamp timestamp NOT NULL,
    favorite boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE order_items (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id integer NOT NULL REFERENCES orders(id),
    item_id integer NOT NULL REFERENCES items(id),
    quantity integer NOT NULL,
    special_instructions text,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES items(id)
);
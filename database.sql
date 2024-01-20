-- drop all tables
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS dfacs CASCADE;
DROP TABLE IF EXISTS cooks CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS nutrition CASCADE;
DROP TABLE IF EXISTS item_tags CASCADE;
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
    meal_card boolean NOT NULL DEFAULT TRUE,
    is_admin boolean NOT NULL DEFAULT FALSE,
    karma_score integer DEFAULT 3,
    email text CHECK (email IS NULL OR (position('@' IN email) > 1)),
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
    rank text,
    fname text NOT NULL,
    lname text NOT NULL,
    dodid VARCHAR(10) NOT NULL CHECK (LENGTH(dodid) = 10),
    email text CHECK (email IS NULL OR (position('@' IN email) > 1)),
    profile_pic text,
    is_manager boolean NOT NULL DEFAULT FALSE,
    update_menu boolean NOT NULL DEFAULT FALSE,
    update_hours boolean NOT NULL DEFAULT FALSE,
    update_meals boolean NOT NULL DEFAULT FALSE,
    created_at timestamp NOT NULL,
    updated_at timestamp,
    deleted_at timestamp
);

CREATE TABLE items (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    menu_item text NOT NULL,
    food_type text NOT NULL,
    recipe_code text,
    description text NOT NULL,
    color_code text,
    sodium_level text,
    da_standard text   
);

CREATE TABLE tags (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    dietary text,
    allergen text,
    promotional text,
    descriptive text,
    availability boolean NOT NULL DEFAULT TRUE,
    img_pic text
);

CREATE TABLE nutrition (
    menu_item_id integer REFERENCES items(id),
    calories text,
    protein text,
    carbs text,
    fat text,
    sodium text,
    cholesterol text,
    sugars text
);

-- Intermediate table between items and tags
CREATE TABLE item_tags (
    item_id integer REFERENCES items(id),
    tag_id integer REFERENCES tags(id),
    PRIMARY KEY (item_id, tag_id)
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
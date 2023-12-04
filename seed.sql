INSERT INTO customers (username, password, fname, lname, dodid, phnumber, is_admin) VALUES 
    ('customer1', 'password1', 'Sylvia', 'Plath', 1234567890, '808-080-8080', TRUE),
    ('customer2', 'password2', 'Anne', 'Sexton', 0987654321, '917-123-4343', FALSE);

INSERT INTO dfacs (dfacname, dfacaddress, dfacphnumber) VALUES 
    ('Warrior Inn DFAC', 'Aleshire Ave, Schofield Barracks, HI 96857', '(808) 655-1062'),
    ('Sustainment Bistro', '780 Menoher Rd, Schofield Barracks, HI 96857', '(808) 753-2842');

INSERT INTO cooks (username, password, fname, lname, is_manager) VALUES
    ('cook1', 'password3', 'Martin', 'Weteschnik', FALSE),
    ('cook2', 'password4', 'Blaine', 'Tibshirani', TRUE);

INSERT INTO items (dfac_id, menu_item, description, price, meta_tag, availability) VALUES
    (1, 'Pizza', "Pick your toppings: pepperoni, sausage, onions, mushrooms", 4.50, 'fan-favorite', TRUE),
    (1, 'Meatloaf', "High in calories and protein", 7.50, "chef's choice", FALSE),
    (2, 'Omelet', "Pick your veggies: peppers, onions, mushrooms, tomatoes", 4.50, 'fan-favorite', TRUE),
    (1, 'Ice-cream', "High in calories and fat", 2.50, 'fan-favorite', TRUE),
    (1, 'Iced-tea', "Classic beverage", 1.50, 'drink', TRUE),
    (1, 'Fried tofu', "Soy product", 8.50, 'vegan', FALSE);

INSERT INTO orders (customer_id, dfac_id, comments, to_go timestamp) VALUES 
    (1, 1, 'Pepperoni and mushroom please', TRUE, '2023-12-01 10:11:02'),
    (2, 2, 'Egg over-easy with everything', FALSE, '2023-12-02 07:01:23');
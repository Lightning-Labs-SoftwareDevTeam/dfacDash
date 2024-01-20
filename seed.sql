INSERT INTO customers (username, password, fname, lname, dodid, phone_number, meal_card, is_admin, karma_score, email, profile_pic) VALUES 
    ('customer1', 'password1', 'Sylvia', 'Plath', '1234567890', '808-080-8080', TRUE, FALSE, 10, splath@fake.com, NULL),
    ('customer2', 'password2', 'Anne', 'Sexton', '9987654321', '917-123-4343', FALSE, TRUE, 20, asexton@fake.com, https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png),
    ('customer3', 'password3', 'Bilbo', 'Baggins', '99998877777', '808-123-5533', TRUE, FALSE, 15, baggins@fake.com, https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png),
    ('customer4', 'password4', 'Arthur', 'Pendragon', '1111155555', '213-321-4321', TRUE, FALSE, 20, kingart@fake.com, https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png),
    ('customer5', 'password5', 'Auntie', 'Ursula', '12345654321', '808-999-5678', FALSE, FALSE, 5, ursula@fake.com, https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png);

INSERT INTO dfacs (dfac_name, dfac_logo, street_address, bldg_num, city, state_abb, zip_code, dfac_phnumber, flash_msg1, flash_msg2, bf_hours,
    lu_hours, dn_hours, bch_hours, sup_hours, order_timebf, order_timelu, order_timedn, order_timebch, order_timesup) VALUES 
    ('Warrior Inn DFAC', 'Aleshire Ave, Schofield Barracks, HI 96857', '(808) 655-1062'),
    ('Sustainment Bistro', '780 Menoher Rd, Schofield Barracks, HI 96857', '(808) 753-2842');

INSERT INTO cooks (username, password, fname, lname, is_manager) VALUES
    ('cook1', 'password3', 'Martin', 'Weteschnik', FALSE),
    ('cook2', 'password4', 'Blaine', 'Tibshirani', TRUE);

INSERT INTO items (dfac_id, menu_item, description, price, meta_tag, availability) VALUES
    (1, 'Pizza', 'Pick your toppings: pepperoni, sausage, onions, mushrooms', 4.50, 'fan-favorite', TRUE),
    (1, 'Meatloaf', 'High in calories and protein', 7.50, 'chefs choice', FALSE),
    (2, 'Omelet', 'Pick your veggies: peppers, onions, mushrooms, tomatoes', 4.50, 'fan-favorite', TRUE),
    (1, 'Ice-cream', 'High in calories and fat', 2.50, 'fan-favorite', TRUE),
    (1, 'Iced-tea', 'Classic beverage', 1.50, 'drink', TRUE),
    (1, 'Fried tofu', 'Soy product', 8.50, 'vegan', FALSE);

INSERT INTO orders (customer_id, dfac_id, price, comments, to_go, order_timestamp) VALUES 
    (1, 1, 4.50, 'Pepperoni and mushroom please', TRUE, '2023-12-01 10:11:02'),
    (2, 2, 4.50, 'Egg over-easy with everything', FALSE, '2023-12-02 07:01:23');
INSERT INTO customers (username, password, fname, lname, dodid, phone_number, meal_card, is_admin, karma_score, email, profile_pic) VALUES 
    ('customer1', 'password1', 'Sylvia', 'Plath', '1234567890', '808-080-8080', TRUE, FALSE, 10, 'splath@fake.com', NULL),
    ('customer2', 'password2', 'Anne', 'Sexton', '9987654321', '917-123-4343', FALSE, TRUE, 20, 'asexton@fake.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'),
    ('customer3', 'password3', 'Bilbo', 'Baggins', '99998877777', '808-123-5533', TRUE, FALSE, 15, 'baggins@fake.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'),
    ('customer4', 'password4', 'Arthur', 'Pendragon', '1111155555', '213-321-4321', TRUE, FALSE, 20, 'kingart@fake.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'),
    ('customer5', 'password5', 'Auntie', 'Ursula', '12345654321', '808-999-5678', FALSE, FALSE, 5, 'ursula@fake.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png');

INSERT INTO dfacs (dfac_name, dfac_logo, street_address, bldg_num, city, state_abb, zip_code, dfac_phnumber, flash_msg1, flash_msg2, bf_hours,
    lu_hours, dn_hours, bch_hours, sup_hours, order_timebf, order_timelu, order_timedn, order_timebch, order_timesup) VALUES 
    ('Warrior Inn Restaurant', 'https://scontent.fhnl3-1.fna.fbcdn.net/v/t39.30808-6/302019523_506178674851223_6673869223261237771_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=GxG43QF0P-AAX-A2VnK&_nc_ht=scontent.fhnl3-1.fna&oh=00_AfBimAUvpkKRP7dn9Az1p_kIs1-C-WvL_GfmLGjCfjXf4A&oe=65B061F7',
     '2085 Aleshire Ave', 'BLDG 2085', 'Schofield Barracks', 'HI', 96857, '(808) 655-1062', 'Good morning Warriors!! The Warrior Inn is back in business!', 'Delicious lucky charm pancakes all week!',
     '0730 - 0900', '1130 -1300', '1700-1830', '0930 - 1230', '1630 - 1800', '0600 - 0830', '0930 - 1230', '1500 - 1800', '0900 - 1200', '1500 - 1730'),
    ('Wings of Lightning Inn', 'https://scontent.fhnl3-1.fna.fbcdn.net/v/t39.30808-6/279890363_362567642573971_6637802255963741101_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=hCHLihVoD0sAX9TloFD&_nc_oc=AQntU_J5lHnwlzUjg8PacAgxZ0Uo-M0dgTHOXjui0S6gV3h-zgvDeiUDL6EVMDKuN8MAMrOdAedRGQfpBb4Ve5Vk&_nc_ht=scontent.fhnl3-1.fna&oh=00_AfAwrQi4Sygilv34aCjElLlR5mt5Ye0kCmKoj0SfpY9gvw&oe=65B1135E',
     '1129 Wright Ave', 'Bldg. 102', 'Wheeler Army Airfield', 'HI', 96854, '(808) 656-2504', 'Welcome to the Award-Winning Wings of Lightning Warrior Restaurant!', 'Special romantic dinner menu planned for February 2024...stay tuned!',
     '0730 - 0900', '1130 -1300', '1700-1830', '0930 - 1230', '1630 - 1800', '0600 - 0830', '0930 - 1230', '1500 - 1800', '0900 - 1200', '1500 - 1730');

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
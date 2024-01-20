INSERT INTO customers (username, password, fname, lname, dodid, phone_number, meal_card, is_admin, karma_score, email, profile_pic) VALUES 
    ('customer1', 'password1', 'Sylvia', 'Plath', '1234567890', '808-080-8080', TRUE, FALSE, 10, 'splath@fake.com', NULL),
    ('customer2', 'password2', 'Anne', 'Sexton', '9987654321', '917-123-4343', FALSE, TRUE, 20, 'asexton@fake.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'),
    ('customer3', 'password3', 'Bilbo', 'Baggins', '9999887777', '808-123-5533', TRUE, FALSE, 15, 'baggins@fake.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'),
    ('customer4', 'password4', 'Arthur', 'Pendragon', '1111155555', '213-321-4321', TRUE, FALSE, 20, 'kingart@fake.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'),
    ('customer5', 'password5', 'Auntie', 'Ursula', '1234565432', '808-999-5678', FALSE, FALSE, 5, 'ursula@fake.com', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png');

INSERT INTO dfacs (dfac_name, dfac_logo, street_address, bldg_num, city, state_abb, zip_code, dfac_phnumber, flash_msg1, flash_msg2, bf_hours,
    lu_hours, dn_hours, bch_hours, sup_hours, order_timebf, order_timelu, order_timedn, order_timebch, order_timesup) VALUES 
    ('Warrior Inn Restaurant', 'https://scontent.fhnl3-1.fna.fbcdn.net/v/t39.30808-6/302019523_506178674851223_6673869223261237771_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=GxG43QF0P-AAX-A2VnK&_nc_ht=scontent.fhnl3-1.fna&oh=00_AfBimAUvpkKRP7dn9Az1p_kIs1-C-WvL_GfmLGjCfjXf4A&oe=65B061F7',
     '2085 Aleshire Ave', 'BLDG 2085', 'Schofield Barracks', 'HI', 96857, '(808) 655-1062', 'Good morning Warriors!! The Warrior Inn is back in business!', 'Delicious lucky charm pancakes all week!',
     '0730 - 0900', '1130 -1300', '1700-1830', '0930 - 1230', '1630 - 1800', '0600 - 0830', '0930 - 1230', '1500 - 1800', '0900 - 1200', '1500 - 1730'),
    ('Wings of Lightning Inn', 'https://scontent.fhnl3-1.fna.fbcdn.net/v/t39.30808-6/279890363_362567642573971_6637802255963741101_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=hCHLihVoD0sAX9TloFD&_nc_oc=AQntU_J5lHnwlzUjg8PacAgxZ0Uo-M0dgTHOXjui0S6gV3h-zgvDeiUDL6EVMDKuN8MAMrOdAedRGQfpBb4Ve5Vk&_nc_ht=scontent.fhnl3-1.fna&oh=00_AfAwrQi4Sygilv34aCjElLlR5mt5Ye0kCmKoj0SfpY9gvw&oe=65B1135E',
     '1129 Wright Ave', 'Bldg. 102', 'Wheeler Army Airfield', 'HI', 96854, '(808) 656-2504', 'Welcome to the Award-Winning Wings of Lightning Warrior Restaurant!', 'Special romantic dinner menu planned for February 2024...stay tuned!',
     '0730 - 0900', '1130 -1300', '1700-1830', '0930 - 1230', '1630 - 1800', '0600 - 0830', '0930 - 1230', '1500 - 1800', '0900 - 1200', '1500 - 1730');

INSERT INTO cooks (dfac_id, username, password, rank, fname, lname, dodid, email, profile_pic, is_admin, is_manager, update_menu, update_hours, update_meals) VALUES
    (1, 'manager1', 'passwordCook', 'SSG', 'Martha', 'Sundam', '8686868686', 'msundam@fake.mail', 'https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/914979826GeneralManager.jpg=ws1280x960',
     FALSE, TRUE, TRUE, TRUE, TRUE),
    (1, 'cook11', 'passwordCook11', 'SGT', 'Blaine', 'Tibshirani', '1112234456', 'btibi@fake.mail', NULL, FALSE, FALSE, TRUE, FALSE, FALSE),
    (1, 'cook12', 'passwordCook12', 'SGT', 'William', 'Glasgow', '1112234476', 'wtibi@fake.mail', NULL, FALSE, FALSE, FALSE, TRUE, FALSE),
    (1, 'cook13', 'passwordCook13', 'SPC', 'Mary', 'Stolzfus', '1112234459', 'mtibi@fake.mail', NULL, FALSE, FALSE, FALSE, FALSE, TRUE),
    (NULL, 'generalmanager', 'generalManager', 'MSG', 'Janice', 'Miller', '9992234458', 'jmiller@fake.mail', 'https://www.shutterstock.com/image-photo/closeup-on-businessman-holding-card-260nw-581019652.jpg',
     TRUE, TRUE, TRUE, TRUE, TRUE),
     (2, 'manager2', 'passwordCook', 'SFC', 'Tyrone', 'Marshall', '9797979797', 'tmarshall@fake.mail', 'https://cdn-icons-png.flaticon.com/512/7414/7414124.png', FALSE, TRUE, TRUE, TRUE, TRUE),
     (2, 'cook21', 'passwordCook21', 'SGT', 'Oscar', 'Mallard', '9797979123', 'oshall@fake.mail', 'https://cdn-icons-png.flaticon.com/512/7414/7414124.png', FALSE, FALSE, TRUE, FALSE, FALSE),
     (2, 'cook22', 'passwordCook22', 'SPC', 'Helen', 'Roback', '4321979797', 'hshall@fake.mail', 'https://cdn-icons-png.flaticon.com/512/7414/7414124.png', FALSE, FALSE, FALSE, TRUE, FALSE),
     (2, 'cook23', 'passwordCook23', 'SPC', 'Moses', 'Layfield', '9797555797', 'mshall@fake.mail', 'https://cdn-icons-png.flaticon.com/512/7414/7414124.png', FALSE, FALSE, FALSE, FALSE, TRUE);

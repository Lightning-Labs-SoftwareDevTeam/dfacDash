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

INSERT INTO items(menu_item, food_type, recipe_code, description, color_code, sodium_level) VALUES
    ('BACON 3PC', 'PROTEIN', 'L-002-00', 'EVERYDAY MENU', 'RED', 'MODERATE'),
    ('TURKEY LINKS 2LINKS', 'PROTEIN', 'L-200-01', 'MONDAY MENU 1', 'RED', 'LOW'),
    ('CREAMED BEEF 5.25OZ', 'GRAVY', 'L-030-00', 'MONDAY MENU 1', 'YELLOW', 'MODERATE'),
    ('STEAMED WHITE RICE 6OZ', 'STARCH', 'E-006-00', 'MONDAY MENU 1', 'YELLOW', 'LOW'),
    ('HOME FRIED POTATOES 3.75OZ', 'STARCH', 'Q-047-00', 'MONDAY MENU 1', 'GREEN', 'LOW'),
    ('SCRAMBLED EGGS 2.25OZ', 'PROTEIN', 'F-010-00', 'MONDAY MENU 1', 'YELLOW', 'LOW'),
    ('BOILED EGGS 2EGGS', 'PROTEIN', 'F-004-51', 'MONDAY MENU 1', 'YELLOW', 'LOW'),
    ('GRITS 6OZ', 'STARCH', 'E-002-00', 'MONDAY MENU 1', 'YELLOW', 'LOW'),
    ('BISCUITS 1EA', 'STARCH', 'D-300-01', 'MONDAY MENU 1', 'RED', 'MODERATE'),
    ('FRENCH TOAST 2SLICE', 'STARCH', 'D-022-01', 'MONDAY MENU 1', 'GREEN', 'MODERATE'),
    ('SMOOTHIE BAR', 'BAR', NULL, 'MONDAY MENU 1', 'WHITE', NULL),
    ('BROCCOLI W SAUTEED ONION', 'VEG', 'Q-105-00', 'MONDAY MENU 1', 'GREEN', 'LOW'),
    ('LASAGNA 10OZ', 'PROTEIN', 'L-025-01', 'MONDAY MENU 1', 'YELLOW', 'HIGH'),
    ('HERBED BAKED CHICKEN BREAST 4OZ', 'PROTEIN', 'L-143-05', 'MONDAY MENU 1', 'GREEN', 'LOW'),
    ('ROSEMARY POTATOES 3OZ', 'STARCH', 'Q-070-00', 'MONDAY MENU 1', 'GREEN', 'LOW'),
    ('RICE PILAF 4.5OZ', 'STARCH', 'E-008-00', 'MONDAY MENU 1', 'YELLOW', 'MODERATE'),
    ('ASPARAGUS 2.75OZ', 'VEG', 'Q-100-52', 'MONDAY MENU 1', 'GREEN', 'MODERATE'),
    ('STEAMED CALIFORNIA BLEND 3.25OZ', 'VEG', 'Q-310-00', 'MONDAY MENU 1', 'GREEN', 'LOW'),
    ('TOASTED GARLIC BREAD 2SLICE', 'STARCH', 'D-007-00', 'MONDAY MENU 1', 'RED', 'MODERATE'),
    ('CREAM OF BROCCOLI SOUP 9OZ', 'SOUP', 'P-014-01', 'MONDAY MENU 1', 'YELLOW', 'HIGH'),
    ('CHICKEN PAN GRAVY 2OZ', 'GRAVY', 'O-016-52', 'MONDAY MENU 1', 'RED', 'HIGH'),
    ('POTATO BAR', 'BAR', NULL, 'MONDAY MENU 1', 'WHITE', NULL),
    ('ITALIAN PASTA SALAD 2.25OZ', 'SALAD', 'M-029-00', 'MONDAY MENU 1', 'YELLOW', 'LOW'),
    ('SPAGHETTI 8OZ', 'PROTEIN', 'L-038-01', 'MONDAY MENU 1', 'YELLOW', 'MODERATE'),
    ('HERBED BAKED FISH 5OZ', 'PROTEIN', 'L-119-04', 'MONDAY MENU 1', 'GREEN', 'LOW'),
    ('INSTANT MASHED POTATOES 6OZ', 'STARCH', 'Q-057-00', 'MONDAY MENU 1', 'GREEN', 'MODERATE'),
    ('STEAMED WHITE RICE 6OZ', 'STARCH', 'E-006-00', 'MONDAY MENU 1', 'YELLOW', 'LOW'),
    ('STEAMED BROCCOLI 2.75OZ', 'VEG', 'Q-105-00', 'MONDAY MENU 1', 'GREEN', 'LOW'),
    ('CORN OBRIEN 4OZ', 'VEG', 'Q-027-01', 'MONDAY MENU 1', 'YELLOW', 'MODERATE'),
    ('HOT ROLLS 2ROLLS', 'STARCH', 'D-033-01', 'MONDAY MENU 1', 'YELLOW', 'MODERATE'),
    ('BROWN PAN GRAVY 2OZ', 'GRAVY', 'O-016-01', 'MONDAY MENU 1', 'YELLOW', 'HIGH'),
    ('MINESTRONE SOUP 8OZ', 'SOUP', 'P-007-01', 'MONDAY MENU 1', 'GREEN', 'HIGH'),

    ('SAUSAGE PATTIES 2PATTY', 'PROTEIN', 'L-089-03', 'TUESDAY MENU 2', 'RED', 'HIGH'),
    ('TURKEY BACON 3PC', 'PROTEIN', 'L-180-02', 'TUESDAY MENU 2', 'RED', 'MODERATE'),
    ('OATMEAL 6OZ', 'STARCH', 'E-001-00', 'TUESDAY MENU 2', 'GREEN', 'LOW'),
    ('PANCAKE 2PAN', 'STARCH', 'D-025-05', 'TUESDAY MENU 2', 'YELLOW', 'MODERATE'),
    ('SAUTEED SPINACH W ONIONS 5.25OZ', 'VEG', 'Q-121-50', 'TUESDAY MENU 2', 'GREEN', 'HIGH'),
    ('BEEF ENCHILADAS 2PC', 'PROTEIN', 'L-063-00', 'TUESDAY MENU 2', 'YELLOW', 'HIGH'),
    ('MEXICAN CHICKEN BREAST 4OZ', 'PROTEIN', 'L-143-04', 'TUESDAY MENU 2', 'GREEN', 'MODERATE'),
    ('SPANISH RICE 6OZ', 'STARCH', 'E-009-551', 'TUESDAY MENU 2', 'YELLOW', 'MODERATE'),
    ('PAPRIKA BUTTERED POTATOES 4.25OZ', 'STARCH', 'Q-033-01', 'TUESDAY MENU 2', 'GREEN', 'MODERATE'),
    ('ROASTED ZUCCHINI 3.5OZ', 'VEG', 'Q-122-01', 'TUESDAY MENU 2', 'GREEN', 'MODERATE'),
    ('MEXICAN CORN 4OZ', 'VEG', 'Q-027-02', 'TUESDAY MENU 2', 'GREEN', 'MODERATE'),
    ('CORN BREAD 1PC', 'STARCH', 'D-015-00', 'TUESDAY MENU 2', 'YELLOW', 'MODERATE'),
    ('CHICKEN TORTILLA SOUP 8OZ', 'SOUP', 'P-025-00', 'TUESDAY MENU 2', 'GREEN', 'HIGH'),
    ('CHILI GRAVY 2OZ', 'GRAVY', 'O-016-03', 'TUESDAY MENU 2', 'YELLOW', 'LOW'),
    ('NACHO BAR', 'BAR', NULL, 'TUESDAY MENU 2', 'WHITE', NULL),
    ('THREE BEAN SALAD 4OZ', 'SALAD', 'M-045-00', 'TUESDAY MENU 2', 'GREEN', 'MODERATE'),
    ('SAVORY BAKED CHICKEN BREAST 4OZ', 'PROTEIN', 'L-826-00', 'TUESDAY MENU 2', 'GREEN', 'MODERATE'),
    ('BEEF STEW 11OZ', 'PROTEIN', 'L-022-00', 'TUESDAY MENU 2', 'GREEN', 'MODERATE'),
    ('INSTANT MASHED POTATOES 6OZ', 'STARCH', 'Q-057-00', 'TUESDAY MENU 2', 'GREEN', 'MODERATE'),
    ('BROWN RICE 6OZ', 'STARCH', 'E-006-50', 'TUESDAY MENU 2', 'GREEN', 'LOW'),
    ('CAULIFLOWER 2.25OZ', 'VEG', 'Q-109-00', 'TUESDAY MENU 2', 'GREEN', 'LOW'),
    ('MIXED VEGETABLES 3OZ', 'VEG', 'Q-126-00', 'TUESDAY MENU 2', 'GREEN', 'LOW'),
    ('VEGETABLE SOUP 8OZ', 'SOUP', 'P-007-00', 'TUESDAY MENU 2', 'GREEN', 'LOW'),

    ('TERIYAKI BEEF & BROCCOLI 4.5OZ', 'PROTEIN', 'L-008-52', ' WEDNESDAY MENU 3', 'YELLOW', 'MODERATE'),
    ('CHICKEN CHOW MEIN, DICED 9.5OZ', 'PROTEIN', 'L-160-00', ' WEDNESDAY MENU 3', 'GREEN', 'HIGH'),
    ('VEGETABLE FRIED RICE', 'STARCH', 'E-007-55', ' WEDNESDAY MENU 3', 'YELLOW', 'MODERATE'),
    ('FRESH MASHED POTATOES 5OZ', 'STARCH', 'Q-048-00', ' WEDNESDAY MENU 3', 'GREEN', 'MODERATE'),
    ('PEAS & CARROTS 4.75OZ', 'VEG', 'Q-041-01', ' WEDNESDAY MENU 3', 'GREEN', 'MODERATE'),
    ('SAUTEED CABBAGE 2.75OZ', 'VEG', 'Q-012-00', ' WEDNESDAY MENU 3', 'GREEN', 'MODERATE'),
    ('GARLIC BUTTERED HOT ROLLS 2ROLLS', 'STARCH', 'D-033-01', ' WEDNESDAY MENU 3', 'YELLOW', 'MODERATE'),
    ('EGG DROP SOUP 8OZ', 'SOUP', 'P-803-00', ' WEDNESDAY MENU 3', 'GREEN', 'MODERATE'),
    ('VEGETABLE GRAVY 2OZ', 'GRAVY', 'O-016-08', ' WEDNESDAY MENU 3', 'YELLOW', 'HIGH'),
    ('MONGOLIAN BAR', 'BAR', NULL, ' WEDNESDAY MENU 3', 'WHITE', NULL),
    ('CUCUMBER & ONION SALAD 3.75OZ', 'SALAD', 'M-015-00', ' WEDNESDAY MENU 3', 'GREEN', 'LOW'),
    ('YAKISOBA 11OZ', 'PROTEIN', 'L-062-50', ' WEDNESDAY MENU 3', 'GREEN', 'MODERATE'),
    ('CHINESE FIVE SPICE CHICKEN 1PC', 'PROTEIN', 'L-153-50', ' WEDNESDAY MENU 3', 'YELLOW', 'MODERATE'),
    ('OVEN BROWNED POTATOES 4OZ', 'STARCH', 'Q-050-00', ' WEDNESDAY MENU 3', 'GREEN', 'MODERATE'),
    ('CARROTS 2.5OZ', 'VEG', 'Q-108-00', ' WEDNESDAY MENU 3', 'GREEN', 'LOW'),
    ('BEEF AND RICE SOUP 8OZ', 'SOUP', 'P-001-00', ' WEDNESDAY MENU 3', 'GREEN', 'HIGH'),

    ('BARBECUED SPARE RIBS 1PC', 'PROTEIN', 'L-092-00', 'THURSDAY MENU 4', 'YELLOW', 'HIGH'),
    ('HERBED BAKED CHICKEN QTRS', 'PROTEIN', 'L-143-54', 'THURSDAY MENU 4', 'YELLOW', 'MODERATE'),
    ('BLACKENED CATFISH 6OZ', 'PROTEIN', 'L-337-00', 'THURSDAY MENU 4', 'GREEN', 'MODERATE'),
    ('BAKED MACARONI & CHEESE 12.75OZ', 'STARCH', 'T-002-01', 'THURSDAY MENU 4', 'YELLOW', 'HIGH'),
    ('CANDIED SWEET POTATOES 5.5OZ', 'STARCH', 'Q-067-00', 'THURSDAY MENU 4', 'RED', 'MODERATE'),
    ('COLLARD GREENS 4OZ', 'VEG', 'Q-029-53', 'THURSDAY MENU 4', 'GREEN', 'MODERATE'),
    ('CORN ON THE COB 1PC', 'VEG', 'Q-111-00', 'THURSDAY MENU 4', 'GREEN', 'LOW'),
    ('CHICKEN NOODLE SOUP 8OZ', 'SOUP', 'P-002-01', 'THURSDAY MENU 4', 'GREEN', 'HIGH'),
    ('POTATO SALAD 5.75OZ', 'SALAD', 'M-040-00', 'THURSDAY MENU 4', 'GREEN', 'MODERATE'),
    ('HERBED BAKED FISH 5OZ', 'PROTEIN', 'L-119-04', 'THURSDAY MENU 4', 'GREEN', 'LOW'),
    ('MEATLOAF 5.5OZ', 'PROTEIN', 'L-035-00', 'THURSDAY MENU 4', 'YELLOW', 'MODERATE'),
    ('GARLIC ROASTED POTATOES 3.24OZ', 'STARCH', 'Q-070-00', 'THURSDAY MENU 4', 'GREEN', 'LOW'),
    ('NOODLES JEFFERSON 3.75OZ', 'STARCH', 'E-012-00', 'THURSDAY MENU 4', 'RED', 'MODERATE'),
    ('CORN 4OZ', 'VEG', 'Q-110-00', 'THURSDAY MENU 4', 'GREEN', 'LOW'),
    ('ASPARAGUS 2.75OZ', 'VEG', 'Q-100-52', 'THURSDAY MENU 4', 'GREEN', 'MODERATE'),
    ('CREAM OF MUSHROOM SOUP 8.5OZ', 'SOUP', 'P-014-00', 'THURSDAY MENU 4', 'YELLOW', 'HIGH'),

    ('PINEAPPLE CHICKEN 1PC', 'PROTEIN', 'L-157-50', 'FRIDAY MENU 5', 'YELLOW', 'HIGH'),
    ('ROAST PORK LOIN 4OZ', 'PROTEIN', 'L-081-01', 'FRIDAY MENU 5', 'GREEN', 'MODERATE'),
    ('PINEAPPLE RICE W CILANTRO 6OZ', 'STARCH', 'S-100-15', 'FRIDAY MENU 5', 'YELLOW', 'LOW'),
    ('FRESH MASHED POTATOES 5OZ', 'STARCH', 'Q-048-00', 'FRIDAY MENU 5', 'GREEN', 'MODERATE'),
    ('CAULIFLOWER AU GRATIN 6OZ', 'VEG', 'Q-018-00', 'FRIDAY MENU 5', 'YELLOW', 'MODERATE'),
    ('WING BAR', 'BAR', NULL, 'FRIDAY MENU 5', 'WHITE', NULL),
    ('MACARONI SALAD 5OZ', 'SALAD', 'M-034-00', 'FRIDAY MENU 5', 'YELLOW', 'LOW'),
    ('SWEET & SOUR PORK 8.5OZ', 'PROTEIN', 'L-082-00', 'FRIDAY MENU 5', 'YELLOW', 'HIGH'),
    ('GRILLED CARIBBEAN CHICKEN BREAST 3OZ', 'PROTEIN', 'L-305-01', 'FRIDAY MENU 5', 'GREEN', 'LOW'),
    ('PARSLEY BUTTERED POTATOES 4.25OZ', 'STARCH', 'Q-033-00', 'FRIDAY MENU 5', 'GREEN', 'MODERATE'),
    ('TOSSED GREEN RICE 6OZ', 'STARCH', 'E-005-02', 'FRIDAY MENU 5', 'YELLOW', 'LOW'),
    ('TOMATO SOUP 8OZ', 'SOUP', 'P-006-00', 'FRIDAY MENU 5', 'YELLOW', 'HIGH'),

    ('GARLIC BUTTER FISH 4OZ', 'PROTEIN', 'L-119-01', 'SATURDAY MENU 6', 'GREEN', 'LOW'),
    ('ROAST BEEF CARVED 4OZ', 'PROTEIN', 'L-005-00', 'SATURDAY MENU 6', 'YELLOW', 'MODERATE'),
    ('GINGER GLAZED CARROTS 4.25OZ', 'VEG', 'Q-017-01', 'SATURDAY MENU 6', 'YELLOW', 'MODERATE'),
    ('ITALIAN MEATBALLS 3.75OZ', 'PROTEIN', 'L-353-02', 'SATURDAY MENU 6', 'YELLOW', 'MODERATE'),
    ('PARMESAN FISH 5OZ', 'PROTEIN', 'L-032-51', 'SATURDAY MENU 6', 'YELLOW', 'MODERATE'),

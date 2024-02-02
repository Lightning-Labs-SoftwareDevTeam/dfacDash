# dfacDash for ordering chow online
  Node Express prototype API for online ordering of DFAC meals to-go.
## Use Case
Instead of waiting in line at the DFAC, patrons can order their food online! Accessing the app from anywhere, they can select meals and alert their chosen restaurant to prepare their plates for dine-in or pickup. Customers can like their favorite menu items and even pick-up meals for their teammates.

## Data models:

### Customers

- `id`: an auto-incrementing integer
- `username`: for log-in to dfacDash
- `password`: hashed by bcrypt
- `fname`: first name
- `lname`: last name
- `dodid`: validates customer
- `phone_number`: in case DFAC needs to contact customer
- `meal_card`: boolean
- `is_admin`: for site owners who also want to order chow
- `karma_score`: for tracking any customers trying to abuse the app
- `email`: optional, but could be used for forgot username/password
- `profile_pic`: optional
- `created_at`, `updated_at`, `deleted_at`: timestamps for database management use

### DFACs

- `id`: an auto-incrementing integer
- `dfac_name`: name of restaurant
- `dfac_logo`: url of logo image
- `street_address`: location of dfac
- `bldg_num`: address segmented
- `city`: for use with maps API
- `state_abb`: location of dfac
- `zip_code`: location of dfac
- `dfac_phnumber`: dfac phone number
- `flash_msg1`: Marketing message
- `flash_msg2`: Marketing message
- `bf_hours`: dfac breakfast hours for dine-in
- `lu_hours`: dfac lunch hours for dine-in
- `dn_hours`: dfac dinner hours for dine-in
- `bch_hours`: dfac brunch hours for dine-in
- `sup_hours`: dfac supper hours for dine-in
- `order_timebf`: window of availability time for online breakfast ordering and pickup
- `order_timelu`: window of availability time for online lunch ordering/pickup
- `order_timedn`: window of availability time for online dinner ordering/pickup
- `order_timebch`: window of availability time for online brunch ordering/pickup
- `order_timesup`: window of availability time for online supper ordering/pickup
- `created_at`, `updated_at`, `deleted_at`

### 92Gs

- `id`: an auto-incrementing integer
- `dfac_id`: links most dfac professionals to a specific dfac; not required
- `username`: for log-in to dfacDash
- `password`: hashed by bcrypt
- `rank`: For personalization and public-facing display
- `fname`: first name
- `lname`: last name
- `dodid`
- `email`
- `profile_pic`
- `is_admin`: for high-ranking DFAC personnel who will take ownership of the app
- `is_manager`: boolean for identifying managers; they can CRUD the menu items, dfac info and hours
- `update_menu`: for admin personnel who can only CRUD the menu
- `update_hours`: for admin personnel who can only CRUD the hours
- `update_meals`: for admin personnel who can only CRUD the meals
- `update_orders`: boolean for 92Gs marking order status and updating karma scores
- `created_at`, `updated_at`, `deleted_at`

### Menu items

- `id`: an auto-incrementing integer for each menu item
- `menu_item`: a menu option, food or drink
- `food_type`: typically either a protein, starch, or vegetable
- `recipe_code`: alphanumeric id of standard preparation procedure
- `description`: describes the delectable delicasy, usually includes weight
- `likes`: integer, default 0, that allows customers to vote for their favorites
- `color_code`: red, yellow, green system describing item's affect on athletic performance
- `sodium_level`: ordinal data, low to high
- `da_standard`: optional field for 92Gs to link the item with DA meal requirements

### Meals

- A combination of menu items that allows the dfac manager to limit the options for pickup and regulate her restaurant's workload
- `id`: auto-incrementing integer
- `dfac_id`: referencing the dfac so that each restaurant can customize their own meal combos
- `meal_name`
- `description`: intended to inform browsing customers of what items constitute the meal
- `type`: breakfast, lunch, dinner, brunch, or supper
- `price`: each type of meal has a set price but dfac managers can modify
- `img_pic`: for marketing the meal to customers
- `likes`: records the popularity of the meal
- `created_at`, `updated_at`, `deleted_at`

### meal_items

- An intermediate table for the mn:mn relationship between meals and menu items
- `meal_id`
- `item_id`
- `quantity`: integer defaults to 1, most meals will not have multiples of the same item
- PRIMARY KEY is the combination of `meal_id` and `item_id`
- FOREIGN KEY constraints: `meal_id` and `item_id`

### Nutritional Information

- `menu_item_id`: references the individual item
- `calories`: integer
- `protein`: text string with number and g for grams
- `carbs`: text
- `fat`: text
- `sodium`: text
- `cholesterol`: text
- `sugars`: text

### Orders

- `id`: an auto-incrementing integer
- `customer_id`: id of customer placing the order
- `dfac_id`: id of dfac processing the order
- `comments`: text-field for any general concerns or specific requests; if a surrogate order the comment will auto-populate with "Pick-up by `customer_fname` `customer_lname` for `customer_fname` `customer_lname`
- `to_go`: boolean for selecting food in a to-go box
- `order_timestamp`: time order was placed online
- `ready_for_pickup`: timestamp when meal is ready for pickup
- `picked_up`: timestamp that order was picked up by customer
- `canceled`: boolean
- `favorite`: optional toggle for saving a recurring transaction

### order_meals

- An intermediate table for the mn:mn relationship between orders and meals
- `id`: primary key
- `order_id`: foreign key pointing to the respective order
- `meal_id`: foreign key pointing to the respectively ordered meal
- `quantity`: integer, customer can order multiples of the same meal; will setup frontend logic for defaulting the quantity to 1 meal per customer
- `price_at_order`: populated by a PostgreSQL trigger function that automatically records the meal price at the time the order is placed. Could be used for analysis of historical price data
- `special_instructions`: another place for any extra text or requests

### Surrogates

- Customers can become surrogate buyers by providing authorization paperwork and getting assigned a surrogate id
- `id`: auto-incrementing integer identifying the specific surrogate order
- `order_id`: foreign key pointing to the respective order
- `customer_id`: foreign key pointing to the actual customer the order is for; requires their dodid
- `surrogate_id`: id given to the customer doing the pick-up when they register to become a surrogate
- `meal_id`: foreign key pointing to the respectively ordered meal
- `authorization_doc`: intended as a url to the required pdf or signed memo for authorizing the surrogate to pick up food for other customers
- UNIQUE combination field of the `order_id` and `surrogate_id`

### Other tables include `tags`, `item_tags` linking menu items with tags, and `customer_likes`

## Tech Stack

Node and Express, along with PostgreSQL for the database.
Another repo with React components consumes the API for single page loading of all backend data.


## Setup

1. npm install
2. set up docker containers (``docker compose up -d``)
3. copy the /sql/ directory into docker. (``docker cp ./sql/ [containername]:/media``)
4. in Docker exec, run ``dfacdash.sql``. Ensure you're in correct directory, then run the following command:
```psql -U [username] -d [databasename] -a -f dfacdash.sql```

- `seed` script inside of package.json works with a postgres database setup; see dfacdash.sql file for further details.

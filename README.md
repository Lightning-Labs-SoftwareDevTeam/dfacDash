# dfacDash for ordering chow online
  Node Express prototype API for uberEats-style online ordering of DFAC meals.
## Use Case
Instead of waiting in line at the DFAC, patrons can order their food online! Accessing the app from anywhere, they can select menu-items and alert their chosen restaurant to prepare their plates for dine-in or pickup. Customers can rate their dining experience and earn exclusive offers by maintaining a high karma score.

## Data models:

### Customers

- `id`: an auto-incrementing integer
- `username`: for log-in to dfacDash
- `password`: hashed by bcrypt
- `fname`: first name
- `lname`: last name
- `dodid`: validates customer
- `phnumber`: in case DFAC needs to contact customer
- `is_admin`: for site owners who also want to order chow
- `karma_score`: for tracking any customers trying to abuse the app
- `email`: optional
- `profile_pic`: optional

### DFACs

- `id`: an auto-incrementing integer
- `dfacname`: name of restaurant
- `dfac_logo`: url of logo image
- `dfacaddress`: location of dfac
- `dfacphnumber`: dfac phone number
- `rating`: dfac rating determined by customers
- `hours`: dfac hours of operation

### 92Gs

- `id`: an auto-incrementing integer
- `username`: for log-in to dfacDash
- `password`: hashed by bcrypt
- `fname`: first name
- `lname`: last name
- `is_manager`: boolean for identifying managers; they can CRUD the menu items

### Menu items

- `id`: an auto-incrementing integer for each menu item
- `dfac_id`: different restaurants may have different menus
- `menu_item`: a menu option, food or drink
- `description`: describes the delectable delicassy
- `price`: total price, including the sales tax of menu item
- `meta_tag`: for vegan, gluten-free, chef's choice, etc
- `availability`: boolean for current status of item

### Orders

- `id`: an auto-incrementing integer
- `customer_id`: id of customer placing the order
- `dfac_id`: id of dfac processing the order
- `price`: total cost of order
- `comments`: text-field for any general concerns
- `to_go`: boolean for selecting food in a to-go box
- `timestamp`: time order was placed online
- `favorite`: optional toggle for saving a recurring transaction

### order_items

- An intermediate table for the mn:mn relationship between orders and menu items
- `id`: primary key
- `order_id`: foreign key pointing to the respective order
- `item_id`: foreign key pointing to the respectively ordered item
- `quantity`: customer can order multiples of the same victual
- `special_instructions`: text box for any special dietary needs or requests

## Tech Stack

Node and Express, along with PostgreSQL for the database.
React consumes the API for single page loading of all backend data.


## Setup

```
    $ npm install
```
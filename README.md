# dfacDash for ordering chow online
  Early Node Express prototype for uberEats-style online ordering of food
## Problem Statement
express, jsonwebtoken, morgan, lorem ipsum, etc

Our data model will use two tables:

### Customers

- `id`: an auto-incrementing integer
- `fname`: first name
- `lname`: last name
- `dodid`: validates customer
- `phnumber`: in case DFAC needs to contact customer

### DFACs

- `id`: an auto-incrementing integer
- `dfacname`: name of restaurant
- `dfacaddress`: location of dfac
- `dfacphnumber`: dfac phone number
- 
### Orders

- `id`: an auto-incrementing integer
- `customer_id`: id of customer placing the order
- `dfac_id`: id of dfac processing the order
- `entre`: main dish
- `price`: total cost of order
- `timestamp`: time order was placed online

## Our Tech Stack

Node and Express, along with PostgreSQL for the database.

*Nunjucks* for HTML templates in JavaScript. Exactly like Jinja2 for Python.


## Setup


```
    $ npm install
```
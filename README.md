## Rest_Store_API
##### ***A RESTful API based on the MVC architecture that handles API requests of a Store App with CRUD (Create, Read, Update, Delete) operations over various models like Users, Products and Orders.***
##### ***Implemented user authentication and authorization using technologies such as 'Bcrypt' and 'JWT' to ensure smooth conditional routing.***

##### <ins>***Skills: NodeJS, ExpressJS, MongoDB***</ins>

## Project Initiation
- Run ```npm install``` command in the root directory to install dependencies.
- Create a '.env' file and write following lines in that file: <br>
  <sub>PORT = 4000</sub> <br>
  <sub>CONN_STR = 'your_mongodb_connection_string'</sub> <br>
  <sub>JWT_KEY = '/^{}$&AEIOU@1090'</sub>
- Replace '_your_mongodb_connection_string_' with connection string of your mongodb atlas database cluster

## Run The Server
- To run the server, run ```npm start``` in the root directory
- Server will run on port number '4000' by default or '5000' in case port is not defined in '.env' file

## Project Documentation
- ### Requirements
  - #### Following requests need user to be logged in, that is, these requests need to have JWT token provided after user login added in request header: <br>
    1. ```POST /products/```
    2. ```PATCH /products/:id```
    3. ```DELETE /products/:id```
    4. ```GET /orders/```
    5. ```POST /orders/```
    6. ```GET /orders/:id```
    7. ```DELETE /orders/:id```
  - #### The JWT token provided after user login needs to be added to header of above requests in the following format: <br>
      | Key | Value     |
      | :-------- | :------- |
      | `Authorization`      | Bearer _token_ |

    _For example,_
    | Key | Value     |
    | :-------- | :------- |
    | `Authorization`      |Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY1NmEwYjEyOWZkZDlhYjgwZDA0ZDJkNyIsImlhdCI6MTcwMTQ0ODQ3NiwiZXhwIjoxNzAxNDUyMDc2fQ.yid-W7D68-9R1TBzUfXjCuVVNF_lKYZB-jGbiHwbuZQ|
   
- ### Models
  - #### Users:
    ```javascript
    const mongoose = require('mongoose');

    const UserSchema = mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
        },
        password: {
            type: String,
            required: true
        }
    });
    
    module.exports = mongoose.model('User', UserSchema);
    ```

  - #### Products:
    ```javascript
    const mongoose = require('mongoose');

    const ProductSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        productImage: {
            type: String
        }
    });
    
    module.exports = mongoose.model('Product', ProductSchema);
    ```

  - #### Orders:
    ```javascript
    const mongoose = require('mongoose');

    const OrderSchema = mongoose.Schema({
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true },
        quantity: { 
            type: Number, 
            default: 1 }
    });
    
    module.exports = mongoose.model('Order', OrderSchema);
    ```

- ### Request examples: <br>
  - POST /users/signup <br>
    POST /users/login
       ```json
       {
         "email": "testuser@gmail.com",
         "password" : "password@1234"
       }
       ```
  - POST /products <br>
    PATCH /products/:id
      | Parameter | Type     | Value                       |
      | :-------- | :------- | :-------------------------------- |
      | `name`      | `text` | Bottle |
      | `price`      | `text` | 449 |
      | `productImage`      | `file` | bottle.jpeg |

  - POST /orders
      ```json
      {
         "product": "65672797e702619807eab781",
         "quantity" : 3
       }
       ```
   

# Project Title
Shopping cart using NodeJS and MySQL

## Getting Started
### Instructions
Clone the repo

git clone https://github.com/godfreaherald/shoppingCartApp.git

#How to run on a local PC

 1.Download dependencies - node, mysql and install on your machine
 
 2.Create .env file  at root folder and copy the  host details from .env-sample file. Set the details.
 
 3.Run all the scripts in the db.sql found under models folder. Follow the order of the scripts to avoid database constraint errors.
 
 4.Run npm i to install node dependencies
 
 5.Finally run npm start to run the app.
 
 6.Follow the API documentation to create API users so as to be able to use the API.
 
 7.Login using the user details you got in No.6 above. This will give you a JWT token to use to access the API resources.
 
 8.Create some categories guided by the API documentation.
 
 9.Create some products, guided by the API documentation.
 
 10. Then you may create a cart,add items or reduce items added to cart.
 
 NB: Assumption is made that a customer can only use the shopping cart once authenticated.


#API Documentation

Open [http://localhost:HOST_PORT/api-docs/](http://localhost:HOST_PORT/api-docs/) to view it in the browser.

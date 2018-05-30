# Bamazon
* This app is Amazon like storefront.
* App demonstrates Node.js and MYSQL integration

### Challenge #1: Customer View (Minimum Requirement)
* The app will take in orders from customers and deplete stock from the store's inventory.
* For the Customer View start the app using `node bamazonCustomer.js`.
* It prompts with a question `Do you want to buy something?`
* Shows you the table of information with Item id ,product name and price and prompts the user to enter Item Id and number of units to purchase.
* If the number of units < stock.App displays the message `Insufficient quantity` and prompts the user to Enter Item id and quantities again to continue.
* When user enters with right quantity.App shows the user with the Total Cost and prompts the user to confirm his purchase.
* When the user is ready to purchase.App depletes the stock from store Inventory and confirms the purchase by displaying `Thank you for purchasing!!` message.
* Validations are also done to check if the user enters correct Item Id or not.

![bamazon customer view](https://github.com/nvidyakarthik/Bamazon/blob/master/Demos/bamazonCustomer.gif)

### Challenge #2: Manager View (Next Level)
* For the Manager View start the app using `node bamazonManger.js`
* App prompts with a list of menu options to choose from
 `View products for sale`,
 `View Low Inventory`,
 `Add to Inventory`,
 `Add New Product`
* Selecting `View products for sale` option lists all the products for sale with a table view
* Selecting `View Low Inventory` option lists all the products that has inventory less than 100
* `Add to Inventory` option prompts the user with Item Id and Quantities to add.(Below demo adds 100 quantities to Item Id 4123 So check for the highlighted 200 updated quantity) 
* `Add New Product` option asks the user to enter product name,department name,price and quantity.(Below demo adds the product Boys Tshirt,clothing department ,each for the price of 15 dollars and quanitity is 500.New product added is highlighted )

![bamazon manager view](https://github.com/nvidyakarthik/Bamazon/blob/master/Demos/bamazonManager.gif)

### Challenge #3: Supervisor View (Final Level)

![bamazon supervisor view](https://github.com/nvidyakarthik/Bamazon/blob/master/Demos/bamazonSupervisor.gif)



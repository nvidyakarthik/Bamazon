# Bamazon
* This app is Amazon like storefront.
* App demonstrates Node.js and MYSQL integration
* To run this app do a git clone https://github.com/nvidyakarthik/Bamazon.git
* Then run the commands schema.sql and seeds.sql in MYSQL workbench to create a database,table structure and table data.
* Run the command `npm i` to install all the packages.
* To run each view follow the command given in each challenge.

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
* For the Supervisor View start the app using `node bamazonSupervisor.js`
* App prompts with a list of menu options to choose from
`View products Sales by Department`,
`Create new Department`,
`View all Departments`
* Selecting `View Product sales by Department` option lists all the products sale by department in a table view
* Selecting `View all Departments` option  lists all the department names.
* `Create new Department` option prompts the user with the Department name and overhead cost.Below demo adds new department `Electronics` with an overhead cost 3000 .New Department added is shown in demo by listing all the departments.
* Last part of the Demo shows the product sales by department.In Customer view  user is making a purchase of the ItemId 4124(baby Dept) with number of units 3000 so the total cost is $86190.00.In the Supervisor View we are taking a look at these transactions made.So the Total Profit for the baby Department 86190-6000=80190(Total sales-overhead cost=Total profit) is highlighted.


![bamazon supervisor view](https://github.com/nvidyakarthik/Bamazon/blob/master/Demos/bamazonSupervisor.gif)



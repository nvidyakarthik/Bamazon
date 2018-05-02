var connectionDB = require("./DBconnection.js");
var inquirer = require("inquirer");
var AsciiTable = require('ascii-table')

//This function is the starting point which welcomes and calls list product function
function startShopping() {
    console.log("Welcome to Bamazon!!!\n");
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirmBuy",
            message: "Do you want to buy something?",
            default: false

        }
    ]).then(function (response) {
        //if buyer confirms then we connect to DB and list products
        if (response.confirmBuy) {
            connectionDB.connect();
            listProducts();
        }       

    });
}
//listing all the products
function listProducts() {

    
    connectionDB.query("SELECT item_id,product_name,department_name,price FROM products", function (err, res) {
        if (err) throw err;
        //checks for empty dataset to avoid error throwing up
        if (res.length != 0) {
            //creates a table format with heading
            var tableFormat = new AsciiTable('PRODUCT LIST');
            //sets heading in each columns
            tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'DEPARTMENT NAME', 'PRICE')
            //looping through to get results
            for (var index in res)
                tableFormat.addRow(res[index].item_id, res[index].product_name, res[index].department_name, res[index].price);
            //prints output to console    
            console.log(tableFormat.toString());
            //calls the function to get user input
            userInput();
        }
        else {
            console.log("No products found.");
        }

    });

}
//This function asks the user to enter the id to buy a product
function userInput() {
    inquirer.prompt([

        {
            type: "input",
            name: "itemId",
            message: "Please Enter the Item Id.",
            //Validation to check if the item id is a number or not
            validate: function (value) {
                if (isNaN(value) === true) {
                    console.log("\nPlease enter a Valid number.");
                    return false;
                }
                else {
                    return true;
                }
            }

        },
        {
            type: "input",
            name: "quantity",
            message: "Please Enter the Number of Units you would like to purchase.",
            validate: function (value) {
                //checks if it is number or not
                if (isNaN(value) === true) {
                    console.log("\nPlease enter a Valid number.");
                    return false;
                }
                //checks if the number is integer or not
                else if (Number.isInteger(Number(value)) === false) {
                    console.log("\nPlease enter a Valid number.");
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    ]).then(function (response) {
        //console.log(response.itemId);
        checkQuantity(response.itemId, Number(response.quantity));

    });

}

//This function checks if there is enough stock is there before buying a product
function checkQuantity(itemId, quantityReq) {

    connectionDB.query("SELECT stock_quantity,price,product_sales FROM products WHERE item_id=?", [itemId], function (err, res) {
        if (err) throw err;
        //Checks if dataset is not empty
        if (res.length != 0) {
            //checks if the user quantity is less than stock and also checks for non negative values
            if (quantityReq <= res[0].stock_quantity && quantityReq > 0) {
                //calculating remaining quantity here
                var remainingQuanity = res[0].stock_quantity - quantityReq;
                //calculating total cost of the product
                var totalCost = res[0].price * quantityReq;
                //calculating new product sales value here
                var newProductSalaes = res[0].product_sales + totalCost;
                console.log("Your Total cost is $" + totalCost.toFixed(2));
                inquirer.prompt([

                    {
                        type: "confirm",
                        name: "confirmPurchase",
                        message: "Do you want to Purchase this Item?",
                        default: false

                    }
                ]).then(function (response) {
                    //checks if the user is ready to buy the product
                    if (response.confirmPurchase)
                        //updates the database with new values
                        updateQuanity(itemId, remainingQuanity, newProductSalaes);
                    else
                        connectionDB.end();

                });
            }
            //checks if user enters invalid quantity
            else if (quantityReq < 0) {
                console.log("Please enter valid quantity.");
                connectionDB.end();
            }
            //checks if the user enters 0 by mistake
            else if (quantityReq == 0) {
                console.log("You entered " + quantityReq + " Please enter the correct quantity.");
                connectionDB.end();

            }
            else {
                console.log("Insufficient quantity! We have only "+res[0].stock_quantity +" Quantities");
                userInput();
            }

        }
        else {
            console.log("Please enter valid Item Id number");
            connectionDB.end();
        }


    });
}
//This function updates the database when the user is ready to buy the product
function updateQuanity(itemId, quantity, productSales) {

    var query = connectionDB.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity,
                product_sales: productSales
            },
            {
                item_id: itemId
            }
        ],
        function (err, res) {
            //console.log(err);
            //console.log(query.sql);
            //console.log(res.affectedRows + " products updated!\n");
            console.log("Thank you for Purchasing!!!")
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "confirmShop",
                    message: "Do you want to Shop again?",
                    default: false
        
                }
            ]).then(function (response) {
                if (response.confirmShop) {                    
                    listProducts();
                }
                else{
                    connectionDB.end();
                }       
        
            });          

        }
    );


}

startShopping();

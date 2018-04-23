var connectionDB = require("./DBconnection.js");
var inquirer = require("inquirer");
var AsciiTable = require('ascii-table')
//connection to the database

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
        // Log all results of the SELECT statement
        //console.log(res);
        if (res.length != 0) {
            var tableFormat = new AsciiTable('PRODUCT LIST');
            tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'DEPARTMENT NAME', 'PRICE')
            for (var index in res)
                tableFormat.addRow(res[index].item_id, res[index].product_name, res[index].department_name, res[index].price);
            console.log(tableFormat.toString());
            userInput();
        }
        else {
            console.log("No products found.");
        }

    });

}
function userInput() {
    inquirer.prompt([

        {
            type: "input",
            name: "itemId",
            message: "Please Enter the Item Id."

        },
        {
            type: "input",
            name: "quantity",
            message: "Please Enter the Number of Units you would like to purchase.",
            validate: function (value) {
                if (isNaN(value) === true) {
                    console.log("\nPlease enter a Valid number.");
                    return false;
                }
                else if (Number.isInteger(Number(value) === false)) {
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
function checkQuantity(itemId, quantityReq) {

    connectionDB.query("SELECT stock_quantity,price,product_sales FROM products WHERE item_id=?", [itemId], function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        /* console.log(res);
        console.log(err); */
        if (res.length != 0) {
            if (quantityReq <= res[0].stock_quantity && quantityReq > 0) {
                var remainingQuanity = res[0].stock_quantity - quantityReq;
                var totalCost = res[0].price * quantityReq;
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
                    if (response.confirmPurchase)
                        updateQuanity(itemId, remainingQuanity, newProductSalaes);
                    else
                        connectionDB.end();

                });
            }
            else if (quantityReq < 0) {
                console.log("Please enter valid quantity.");
                connectionDB.end();
            }
            else if (quantityReq == 0) {
                console.log("You entered " + quantityReq + " Please enter the correct quantity.");
                connectionDB.end();

            }
            else {
                console.log("Insufficient quantity!");
                connectionDB.end();
            }

        }
        else {
            console.log("Please enter valid Item Id number");
            connectionDB.end();
        }


    });
}

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

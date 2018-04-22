var mysql = require("mysql");
var inquirer = require("inquirer");
var AsciiTable = require('ascii-table')
//connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Nvidya1981!",
    database: "bamazonDB"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    listProducts();




});

//listing all the products
function listProducts() {

    connection.query("SELECT item_id,product_name,price FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        var tableFormat = new AsciiTable('PRODUCT LIST');
        tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'PRICE')
        for (var index in res)
            tableFormat.addRow(res[index].item_id, res[index].product_name, res[index].price);
        console.log(tableFormat.toString());
        userInput();

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
            message: "Please Enter the Number of Units you would like to purchase."
        }
    ]).then(function (response) {
        console.log(response.itemId);
        checkQuantity(response.itemId, Number(response.quantity));

    });

}
function checkQuantity(itemId, quantityReq) {

    connection.query("SELECT stock_quantity,price,product_sales FROM products WHERE item_id=?", [itemId], function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        /* console.log(res);
        console.log(err); */
        if (res.length != 0) {
            if (quantityReq <= res[0].stock_quantity && quantityReq > 0) {
                var remainingQuanity = res[0].stock_quantity - quantityReq;
                var totalCost=res[0].price * quantityReq;
                console.log("Your Total cost is $" + totalCost);
                var newProductSalaes=res[0].product_sales+totalCost;
                updateQuanity(itemId, remainingQuanity,newProductSalaes);
                
                
            }
            else if (quantityReq < 0) {
                console.log("Please enter valid quantity.");
                connection.end();
            }
            else if (quantityReq == 0) {
                console.log("You entered " + quantityReq + " Please enter the correct quantity.");
                connection.end();

            }
            else {
                console.log("Insufficient quantity!");
                connection.end();
            }

        }
        else {
            console.log("Please enter valid Item Id number");
            connection.end();
        }


    });
    



}



function updateQuanity(itemId, quantity,productSales) {

    var query = connection.query(
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
            //console.log(query);
            console.log(res.affectedRows + " products updated!\n");
            connection.end();
           
        }
    );


}

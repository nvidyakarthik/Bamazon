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
    managerInput();
    
});
function managerInput(){
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please Select from options..",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"]
          }

    ]).then(function(response) {  
        console.log(response.options) ;
        switch(response.options){
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break; 
            case "Add New Product":
                  addProduct();
                break;  
            }
    });
}

function viewProducts(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        var tableFormat = new AsciiTable('PRODUCT LIST');
        tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'PRICE','QUANTITES');
        for (var index in res)
            tableFormat.addRow(res[index].item_id, res[index].product_name, res[index].price,res[index].stock_quantity);
        console.log(tableFormat.toString());
        connection.end();
    });
}


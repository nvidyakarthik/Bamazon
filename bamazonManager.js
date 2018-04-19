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
    connection.end();
});
function managerInput(){
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please Select from options..",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product"]
          }

    ]).then(function(user) {  
        console.log(user.options) ;
    });
}


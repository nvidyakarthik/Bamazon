var connectionDB = require("./DBconnection");
var inquirer = require("inquirer");
var AsciiTable = require('ascii-table');
var deptNameArray = [];

function managerInput() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please Select from options..",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }

    ]).then(function (response) {
        //console.log(response.options);
        switch (response.options) {
            case "View Products for Sale":
                viewProducts();
                connectionDB.end();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                viewProducts();
                setTimeout(function () { addInventory(); }, 500);
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    });
}

function viewProducts() {
    connectionDB.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        var tableFormat = new AsciiTable('PRODUCT LIST');
        tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'PRICE', 'QUANTITES');
        for (var index in res) {

            tableFormat.addRow(res[index].item_id, res[index].product_name, res[index].price, res[index].stock_quantity);
        }
        console.log(tableFormat.toString());


    });
}

function viewLowInventory() {
    connectionDB.query("SELECT * FROM products WHERE stock_quantity <=100", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        var tableFormat = new AsciiTable('INVENTORY LESS THEN 100');
        tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'PRICE', 'QUANTITES');
        for (var index in res) {

            tableFormat.addRow(res[index].item_id, res[index].product_name, res[index].price, res[index].stock_quantity);
        }
        console.log(tableFormat.toString());
        connectionDB.end();


    });
}

function getDeptNameList(callbackfunc) {

    connectionDB.query("SELECT department_name FROM departments", function (err, res) {
        if (err) throw err;
        //console.log(res);
        for (var index in res)
            deptNameArray.push(res[index].department_name);
        //console.log(productArray);
        callbackfunc(deptNameArray);

    });

}

function getInventory(itemId, callbackfunc) {
    connectionDB.query("SELECT stock_quantity FROM products WHERE item_id=?", [itemId], function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        if (res.length != 0) {
            callbackfunc(res[0].stock_quantity);
        }
        else {
            console.log("Item Id Not found");
            connectionDB.end();
        }
    });

}

function addInventory() {

    
    inquirer.prompt([

        {
            type: "input",
            name: "itemId",
            message: "Enter the Item Id ",

        },
        {
            type: "input",
            name: "quantity",
            message: "Enter quantity you want to add "
        },
    ]).then(function (response) {
        getInventory(response.itemId, function (result) {
            //console.log("database inventory"+result);
            var newInventory = result + Number(response.quantity);
            //console.log("new inventory "+newInventory);
            var query = connectionDB.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newInventory
                    },
                    {
                        item_id: response.itemId
                    }
                ],
                function (err, res) {
                    //console.log(err);
                    //console.log(res.affectedRows + " products updated!\n");
                    if (res.affectedRows == 1) {
                        console.log("Inventory updated!!");
                    }
                    connectionDB.end();

                }
            );
        });
    });
    
}

function addProduct() {
    getDeptNameList(function(deptNameList){
    inquirer.prompt([

        {
            type: "input",
            name: "productName",
            message: "Enter the Product Name ",

        },
        {
            type: "list",
            name: "departmentName",
            message: "Select Department Name ",
            choices:deptNameList
        },
        {
            type: "input",
            name: "price",
            message: "Enter the Price ",
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
            message: "Enter total quantity ",
            validate: function (value) {
                if (isNaN(value) === true) {
                    console.log("\nPlease enter correct Quantity.");
                    return false;
                }
                else if (Number.isInteger(Number(value)) === false && Number(value)<=0) {
                    console.log("\nPlease enter correct Quantity.");
                    return false;
                }
                else {
                    return true;
                }
            }
        },

    ]).then(function (response) {
        var query = connectionDB.query(
            "INSERT INTO products SET ?",
            {
                product_name: response.productName,
                department_name: response.departmentName,
                price: response.price,
                stock_quantity: response.quantity
            },
            function (err, res) {
                if (res.affectedRows == 1) {
                    console.log("New product added!!");
                    connectionDB.end();
                }
                else {
                    console.log("Some error has occurred.Try again");
                    connectionDB.end();
                }

            }
        );

    });
});

}

managerInput();


var mysql = require("mysql");
var inquirer = require("inquirer");
var AsciiTable = require('ascii-table');
var productArray = [];
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
function managerInput() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please Select from options..",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }

    ]).then(function (response) {
        console.log(response.options);
        switch (response.options) {
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

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        //console.log(res);
        var tableFormat = new AsciiTable('PRODUCT LIST');
        tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'PRICE', 'QUANTITES');
        for (var index in res){
            
            tableFormat.addRow(res[index].item_id, res[index].product_name, res[index].price, res[index].stock_quantity);
        }
        console.log(tableFormat.toString());
        connection.end();

    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <=100", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        var tableFormat = new AsciiTable('INVENTORY LESS THEN 100');
        tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'PRICE', 'QUANTITES');
        for (var index in res){
            
            tableFormat.addRow(res[index].item_id, res[index].product_name, res[index].price, res[index].stock_quantity);
        }
        console.log(tableFormat.toString());
        connection.end();


    });
}

function getProductNameList(callbackfunc) {
    
    connection.query("SELECT product_name FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res);
        for (var index in res)
            productArray.push(res[index].product_name);
            //console.log(productArray);
            callbackfunc(productArray);       

    });

}

function getInventory(itemId,callbackfunc){
    connection.query("SELECT stock_quantity FROM products WHERE item_id=?",[itemId], function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
       if(res.length!=0){ 
            callbackfunc(res[0].stock_quantity);
       }
       else{
           console.log("Please enter the correct Item Id");
           connection.end();
       }
    });

}

function addInventory(){
    
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
        getInventory(response.itemId,function(result){
            console.log("database inventory"+result);
            var newInventory=result+Number(response.quantity);
            console.log("new inventory "+newInventory);
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newInventory
                  },
                  {
                    item_id: response.itemId
                  }
                ],  
                function(err, res) {
                  //console.log(err);
                  console.log(res.affectedRows + " products updated!\n");
                  connection.end();
                  
                }
              );
    


        });
        
        


    }); 

}

function addProduct(){
    inquirer.prompt([

        {
            type: "input",
            name: "productName",
            message: "Enter the Product Name ",
            
        },
        {
            type: "input",
            name: "departmentName",
            message: "Enter the Department Name "
        },
        {
            type: "input",
            name: "price",
            message: "Enter the Price "
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter total quantity "
        }
    ]).then(function (response) {
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
              product_name: response.productName,
              department_name: response.departmentName,
              price: response.price,
              stock_quantity:response.quantity
            },
            function(err, res) {
                
              console.log(res.affectedRows + " product inserted!\n");
            }
          );
        
          // logs the actual query being run
          console.log(query.sql);
    });

}

/* function addInventory() {
    
     getProductNameList(function(getProductNames){
        inquirer.prompt([

            {
                type: "list",
                name: "productName",
                message: "Please Select from options..",
                choices: getProductNames
            },
            {
                type: "input",
                name: "quantity",
                message: "Enter quantity you want to add"
            },
        ]).then(function (response) {

            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: response.quantity
                  },
                  {
                    product_name: response.productName
                  }
                ],
                function(err, res) {
                  console.log(err);
                  console.log(res.affectedRows + " products updated!\n");
                  connection.end();
                  
                }
              );
    
    
    
        }); 
       
     });    
} */
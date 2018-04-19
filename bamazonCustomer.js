var mysql=require("mysql");
var inquirer = require("inquirer");
var AsciiTable = require('ascii-table')
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "Nvidya1981!",
    database: "bamazonDB"
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    listProducts();
    
       
    
  });
  function listProducts(){
    
    connection.query("SELECT item_id,product_name,price FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      //console.log(res);
      var tableFormat = new AsciiTable('PRODUCT LIST');
      tableFormat.setHeading('ITEM ID', 'PRODUCT NAME', 'PRICE')
       for(var index in res)
          tableFormat.addRow(res[index].item_id,res[index].product_name,res[index].price);        
    console.log(tableFormat.toString());
          connection.end();
      }); 
      


  }
  
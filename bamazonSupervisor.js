var connectionDB = require("./DBconnection");
var inquirer = require("inquirer");
var AsciiTable = require('ascii-table')

function supervisorInput() {
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "Please Select from options..",
            choices: ["View Product Sales by Department", "Create new Department","View all Departments"]
        }

    ]).then(function (response) {
        //console.log(response.options);
        switch (response.options) {
            case "View Product Sales by Department":
                viewSalesByDept();
                
                break;
            case "Create new Department":
                createDept();
                
                break;
            case "View all Departments":
                viewAllDept();
                
                break;    
            
        }
    });
}

function viewAllDept(){
    connectionDB.query("SELECT department_name FROM departments", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        var tableFormat = new AsciiTable();
        tableFormat.setHeading('DEPARTMENT NAME');
        for (var index in res){
            
            tableFormat.addRow(res[index].department_name);
        }
        console.log(tableFormat.toString());
        connectionDB.end();


    });

}
function viewSalesByDept(){
    connectionDB.query("select departments.department_id,departments.department_name,departments.over_head_costs,SUM(products.product_sales) as product_sales,(SUM(product_sales)-departments.over_head_costs) as total_profit from departments inner join products where departments.department_name=products.department_name group by products.department_name;", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        var tableFormat = new AsciiTable('PRODUCT SALES BY DEPARTMENT');
        tableFormat.setHeading('DEPARTMENT ID', 'DEPARTMENT NAME', 'OVER HEAD COST', 'PRODUCT SALES','TOTAL PROFIT');
        for (var index in res){
            
            tableFormat.addRow(res[index].department_id, res[index].department_name, res[index].over_head_costs, res[index].product_sales,res[index].total_profit);
        }
        console.log(tableFormat.toString());
        connectionDB.end();


    });

}

function createDept(){
    inquirer.prompt([

        {
            type: "input",
            name: "departmentName",
            message: "Enter the department Name ",
            
        },
        {
            type: "input",
            name: "overHeadCost",
            message: "Enter over Head cost "
        }
        
    ]).then(function (response) {
        var query = connectionDB.query(
            "INSERT INTO departments SET ?",
            {
              
              department_name: response.departmentName,
              over_head_costs:response.overHeadCost
            },
            function(err, res) {
              //console.log(err);
              if(res.affectedRows==1){
              console.log("New Department Added\n");
              }
              connectionDB.end();
            }
          );
        
          // logs the actual query being run
          //console.log(query.sql);
    });

}

supervisorInput();


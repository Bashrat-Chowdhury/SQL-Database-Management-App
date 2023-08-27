const { prompt } = require("inquirer");
const db = require("./db");

initialprompts();

function initialprompts() {
  prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "initiallist",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add Employees",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "View All Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "View All Deparements",
          value: "VIEW_ALL_DEPTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.initiallist;
    switch (choice) {
      case "VIEW EMPLOYEES":
        viewEmployees();
        break;
    }
  });
}

function viewEmployees() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    console.log("\n");
    console.table(employees);
  });
}

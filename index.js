const { prompt } = require("inquirer");
const db = require("./db/connection");

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
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "VIEW_ALL_DEPTS":
        viewDeps();
        break;
    }
  });
}

function viewEmployees() {
  const query = "SELECT * FROM employee";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialprompts();
  });
}

function viewRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialprompts();
  });
}

function viewDeps() {
  const query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialprompts();
  });
}

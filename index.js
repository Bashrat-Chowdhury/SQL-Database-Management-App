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
      case "ADD_DEPT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
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
  const query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialprompts();
  });
}

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((res) => {
    let departmentName = res.name;
    createDepartment(departmentName)
      .then(() => {
        console.log(`Added ${departmentName} to the database`);
        initialprompts();
      })
      .catch((err) => {
        console.error("Error adding department:", err);
        initialprompts();
      });
  });
}

function createDepartment(departmentName) {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO department (name) VALUES (?)";
    db.query(query, [departmentName], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function addRole() {
  prompt([
    {
      name: "title",
      message: "Enter the title of the new role:",
    },
    {
      name: "salary",
      message: "Enter the salary for the new role:",
    },
    {
      name: "department_id",
      message: "Enter the department ID for the new role:",
    },
  ]).then((res) => {
    const { title, salary, department_id } = res;
    createRole(title, salary, department_id);
  });
}

function createRole(title, salary, department_id) {
  const query =
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
  db.query(query, [title, salary, department_id], (err, result) => {
    if (err) {
      console.error("Error adding role:", err);
    } else {
      console.log(`Added role "${title}" to the database.`);
      initialprompts();
    }
  });
}

const { prompt } = require("inquirer");
//sql connection requirement
const db = require("./db/connection");

//calling function for initial prompts
initialprompts();

//function for initial prompts for user to interact with employee data
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
    //different functions called for each case of user action
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
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
    }
  });
}

//function using SQL query to view employee table
function viewEmployees() {
  const query = "SELECT * FROM employee";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialprompts();
  });
}

//function using SQL query to view role table
function viewRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialprompts();
  });
}

//function using SQL query to view department table
function viewDeps() {
  const query = "SELECT * FROM department";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialprompts();
  });
}

function addDepartment() {
  //function prompts further questions to user
  prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
    //user input used to add new department to table using another function
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

//user input used as values to add new row to department table
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
  //function prompts further questions to user
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
    //user input used to add new role to table using another function
  ]).then((res) => {
    const { title, salary, department_id } = res;
    createRole(title, salary, department_id);
  });
}

//user input used as values to add new row to role table
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

function addEmployee() {
  //function prompts further questions to user
  prompt([
    {
      name: "first_name",
      message: "Enter the first name of the new employee:",
    },
    {
      name: "last_name",
      message: "Enter the last name of the new employee:",
    },
    {
      name: "role_id",
      message: "Enter the role ID for the new employee:",
    },
    {
      name: "manager_id",
      message: "Enter the manager ID for the new employee:",
    },
    //user input used to add new employee to table using another function
  ]).then((res) => {
    const { first_name, last_name, role_id, manager_id } = res;
    createEmployee(first_name, last_name, role_id, manager_id);
  });
}

//user input used as values to add new row to employee table
function createEmployee(first_name, last_name, role_id, manager_id) {
  const query =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [first_name, last_name, role_id, manager_id],
    (err, result) => {
      if (err) {
        console.error("Error adding employee:", err);
      } else {
        console.log(
          `Added employee "${first_name} ${last_name}" to the database.`
        );
        initialprompts();
      }
    }
  );
}

function updateEmployeeRole() {
  //function prompts further questions to user
  prompt([
    {
      name: "employee_id",
      message: "Enter the ID of the employee you want to update:",
    },
    {
      name: "new_role_id",
      message: "Enter the new role ID for the employee:",
    },
    //user input used to update employee role using another function
  ]).then((res) => {
    const { employee_id, new_role_id } = res;
    changeRole(employee_id, new_role_id);
  });
}

//user input used as values to add change role id for employee
function changeRole(employee_id, new_role_id) {
  const query = "UPDATE employee SET role_id = ? WHERE id = ?";
  db.query(query, [new_role_id, employee_id], (err, result) => {
    if (err) {
      console.error("Error updating employee role:", err);
    } else {
      console.log(`Updated role for employee with ID ${employee_id}.`);
      initialprompts();
    }
  });
}

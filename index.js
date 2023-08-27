const { prompt } = require("inquirer");
const db = require("./db");

initialprompts();

function initialprompts() {
    prompt ([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'initiallist',
            choices: [
                {
                    name: "View All Employees",
                    value:
                },
                {
                    name: "Add Employees",
                    value: 
                },
                {
                    name: "Update Employee Role",
                    value:
                },
                {
                    name: "View All Roles",
                    value:
                },
                {
                    name: "Add Role",
                    value: 
                },
                {
                    name: "View All Deparements",
                    value:
                },
                {
                    name: "Add Department",
                    value: 
                }

            ]
        }
        ])
        .then((response) => (
          //add response logic
        );

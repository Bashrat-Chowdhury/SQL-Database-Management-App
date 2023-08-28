INSERT INTO department (id, name) 
VALUES (1, 'Engineering'),
(2, 'Sales'),
(3, 'Marketing');


INSERT INTO role (id, title, salary, department_id) 
VALUES (111, 'Software Engineer', 80000, 1),
(222, 'Sales Associate', 50000, 2),
(333, 'Marketing Specialist', 60000, 3);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES (4141, 'Bashrat', 'Chowdhury', 111, 001),
(2121, 'John', 'Smith', 222, 002);


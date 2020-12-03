use employees;

INSERT INTO department
    (name)
VALUES
    ('Field'),
    ('Laboratory'),
    ('Administration'),
    ('Community');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Archaeology field technician', 54000, 1),
    ('Field tech specialist', 60000, 1),
    ('Geologist', 63000, 2),
    ('Site manager', 65000, 1),
    ('Archaeology intern', 45000, 1),
    ('Lab intern', 45000, 2),
    ('Cultural resource management', 50000, 4),
    ('Archivist', 53000, 3),
    ('Professor of archaeology', 70000, 3),
    ('Forensic anthropologist', 59000, 2),
    ('Legal consultation', 80500, 4)

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Franz', 'Boas', 10, 1),
    ('Jane', 'Goodall', 9, 2),
    ('Indiana', 'Jones', 1, NULL),
    ('Seeley', 'Booth', 11, NULL),
    ('Bones', 'Brennan', 11, 3),
    ('Brian', 'Weitz', 3, NULL),
    ('Atticus', 'Finch', 12, NULL)

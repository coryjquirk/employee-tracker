const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

init();
async function init() {
  console.log("Fieldwork Manager");
  await mainPrompts();
}

async function mainPrompts() {
    const { choice } = await prompt([
      {
        type: "list",
        name: "choice",
        message: "Good day, what do you need?",
        choices: [
          {
            name: "All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
          },
          {
            name: "All Employees By Manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER"
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          },
          {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "Remove Role",
            value: "REMOVE_ROLE"
          },
          {
            name: "All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENT"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ]).then
  
    // Call the appropriate function depending on what the user chose
    switch (choice) {
      case "VIEW_EMPLOYEES":
        return viewEmployees();
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        return viewEmployeesByDepartment();
      case "VIEW_EMPLOYEES_BY_MANAGER":
        return viewEmployeesByManager();
      case "ADD_EMPLOYEE":
        return addEmployee();
      case "REMOVE_EMPLOYEE":
        return removeEmployee();
      case "UPDATE_EMPLOYEE_ROLE":
        return updateEmployeeRole();
      case "UPDATE_EMPLOYEE_MANAGER":
        return updateEmployeeManager();
      case "VIEW_DEPARTMENTS":
        return viewDepartments();
      case "ADD_DEPARTMENT":
        return addDepartment();
      case "REMOVE_DEPARTMENT":
        return removeDepartment();
      case "VIEW_ROLES":
        return viewRoles();
      case "ADD_ROLE":
        return addRole();
      case "REMOVE_ROLE":
        return removeRole();
      default:
      return quit();
    }
  }
  
  async function viewEmployees() {
    const employees = await db.findAllEmployees();
  
    console.log("\n");
    console.table(employees);
  
    mainPrompts();
  }
  
  async function viewEmployeesByDepartment() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const { departmentId } = await prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices
      }
    ]);
  
    const employees = await db.findAllEmployeesByDepartment(departmentId);
  
    console.log("\n");
    console.table(employees);
  
    mainPrompts();
  }
  
  async function viewEmployeesByManager() {
    const managers = await db.findAllEmployees();
  
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee do you want to see direct reports for?",
        choices: managerChoices
      }
    ]);
  
    const employees = await db.findAllEmployeesByManager(managerId);
  
    console.log("\n");
  
    if (employees.length === 0) {
      console.log("The selected employee has no direct reports");
    } else {
      console.table(employees);
    }
  
    mainPrompts();
  }
  
  async function removeEmployee() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices
      }
    ]);
  
    await db.removeEmployee(employeeId);
  
    console.log("Erased employee info from the database");
  
    mainPrompts();
  }
  
  async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role should we assign the selected employee?",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
  
    console.log("Updated employee's role");
  
    mainPrompts();
  }
  
  async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager should we update?",
        choices: employeeChoices
      }
    ]);
  
    const managers = await db.findAllPossibleManagers(employeeId);
  
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message:
          "Which employee do you want to set as manager for the selected employee?",
        choices: managerChoices
      }
    ]);
  
    await db.updateEmployeeManager(employeeId, managerId);
  
    console.log("Updated employee's manager");
  
    mainPrompts();
  }
  
  async function viewRoles() {
    const roles = await db.findAllRoles();
  
    console.log("\n");
    console.table(roles);
  
    mainPrompts();
  }
  
  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "What's the role called?"
      },
      {
        name: "salary",
        message: "What's the role's yearly pay?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department is this role a part of?",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    mainPrompts();
  }
  
  async function removeRole() {
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "Which role should we erase? (WARNING: This will also erase employees)",
        choices: roleChoices
      }
    ]);
  
    await db.removeRole(roleId);
  
    console.log("Erased role from the database");
  
    mainPrompts();
  }
  
  async function viewDepartments() {
    const departments = await db.findAllDepartments();
  
    console.log("\n");
    console.table(departments);
  
    mainPrompts();
  }
  
  async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "What's the department called?"
      }
    ]);
  
    await db.createDepartment(department);
  
    console.log(`Added ${department.name} to the database`);
  
    mainPrompts();
  }
  
  async function removeDepartment() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const { departmentId } = await prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department would you like to erase? (WARNING: This will also erase associated roles and employees)",
      choices: departmentChoices
    });
  
    await db.removeDepartment(departmentId);
  
    console.log(`Erased department from the database`);
  
    mainPrompts();
  }
  
  async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the person's first name?"
      },
      {
        name: "last_name",
        message: "What is the person's last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "What is the person's role?",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Who is the person's manager?",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.createEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to our database`
    );
  
    mainPrompts();
  }
  
  function quit() {
    console.log("See ya!");
    process.exit();
  }

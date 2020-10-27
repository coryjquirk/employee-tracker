const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    // Your username
    user: "root",
    // Your password
    password: "]myz_y:92^s3q",
    database: "employees"
  });

  //don't need a port cuz this ain't for a browser
  connection.connect();

  // Setting up connection.query to use promises instead of callbacks
  // This allows us to use the async/await syntax
  connection.query = util.promisify(connection.query);
  
  module.exports = connection;
  

  //STAYS US KINEKTID 2 MYSQL
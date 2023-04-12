const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const connection = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});
if (connection) console.log("mysql in users");

const getUsers=(req,res)=>{
  connection.query(
    "SELECT * FROM user_accounts",
    function (err, results, fields) {
      if(err) return res.status(500).json({"error":err})
      return res.status(200).json(results);
    })
}
const registerController = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .send("Please fill all the fields with valid details");
  connection.query(
    `SELECT * FROM user_accounts WHERE username="${username}"`,
    function (err, results, fields) {
      if (err) return res.status(500).send(err.message);
      if (results[0])
        return res.status(400).send("This username already exists");
      connection.query(
        `INSERT INTO user_accounts(username,email,password) VALUES("${username}","${email}","${password}")`,
        function (err, results, fields) {
          if (err) return res.status(500).send(err);
          return res.status(200).send("Registration successful");
        }
      );
    }
  );
};
const loginController = (req, res) => {
  const data = req.body;
  const loginQuery=`SELECT username,password FROM user_accounts WHERE username='${data.username}' AND password='${data.password}'`
  if (!data.username || !data.password)
    return res.status(400).send("Please provide your username and password");
  connection.query(
    loginQuery,
    function (err, results) {
      if (err) return res.status(500).send(err.message);
      const user= results.find((result)=> result.username===data.username || result.password === data.password)
      console.log(user);
      if(!user)
        return res.status(404).send("Invalid credentials")
      return res.status(200).json({"username" : user.username, "password" : user.password,"statusMessage": "Login Successful"});
    }
  );
};
exports.registerController = registerController;
exports.loginController = loginController;
exports.getUsers = getUsers;

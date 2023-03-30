const mysql2 = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const connection = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
});
if (connection) console.log("mysql in files");

const getAllFiles = async (req, res) => {
  const getQuery = `SELECT * FROM secret_files`;
  connection.query(getQuery, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).send(results);
  });
};

function getDir(){
  const index = __dirname.indexOf("/u")
  const dir = __dirname.slice(index,__dirname.length-1)
  return dir.concat("/");
}
let fileID = 0;
const uploadFile = (req, res) => {
  const fileName = req.body.file_name;
  const filePath = path.join(getDir(), fileName);
  const postQuery = `INSERT INTO secret_files VALUES(${++fileID},'${fileName}','${filePath}')`;
  connection.query(postQuery, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ status: "File Uploaded successfully" });
  });
};

exports.getAllFiles = getAllFiles;
exports.uploadFile = uploadFile;

const mysql2 = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
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
    console.log(results);
    return res.status(200).send(results);
  });
};

function getDir() {
  const index = __dirname.indexOf("/u");
  const dir = __dirname.slice(index, __dirname.length - 1);
  return dir.concat("/");
}
//let fileID = 5;

const uploadFile = (req, res) => {
  const fileName = req.body.file_name;
  const filePath = path.join(getDir(), fileName);
  const postQuery = `INSERT INTO secret_files VALUES('${fileName}','${filePath}')`;
  connection.query(postQuery, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json({ status: "File Uploaded successfully" });
  });
};

const deleteFile = (req, res) => {
  const deleteFileID = req.params.id;
  const getQuery = `SELECT file_path FROM secret_files WHERE file_id=${deleteFileID}`;
  connection.query(getQuery, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    fs.unlink("C:/Users/Prajwal/OneDrive/Desktop/project/hack-play/backend/upload/2023client.c", (err) => {
      if (err) console.log(err);
    });
    connection.query(
      `DELETE FROM secret_files WHERE file_id=${deleteFileID}`,
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        return res.status(200).json({ status: "File deleted successfully" });
      }
    );
  });
};
exports.getAllFiles = getAllFiles;
exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;

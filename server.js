const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
let cors = require("cors");
server.use(cors());
server.use(bodyParser.json());
const taskData = require("./tasks.json");
const { status } = require("express/lib/response");

//Establish the database connection

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "task_list",
// });

// db.connect(function (error) {
//   if (error) {
//     console.log("Error Connecting to DB");
//   } else {
//     console.log("successfully Connected to DB");
//   }
// });

//Establish the Port

server.listen(8070, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  } else {
    console.log("Started....!!!! 8070");
  }
});

//view the tasks

server.get("/api/task", (req, res) => {
  //json server
  res.send({ status: true, data: taskData });

  //sql
  // let sql = "SELECT * FROM tasks";
  // db.query(sql, function (error, result) {
  //   if (error) {
  //     console.log("Error Connecting to DB");
  //   } else {
  //     // res.status(200).json(result);
  //     res.send({ status: true, data: taskData });
  //   }
  // });
});

//Create the Task

server.post("/api/task/add", (req, res) => {
  let details = {
    id: taskData.length, //comment if using sql
    title: req.body.title,
    description: req.body.description,
    long_description: req.body.long_description,
    status: "todo",
  };

  //json server
  taskData.push(details);
  res.send({ status: true, message: "Task Created successfully" });

  //sql
  // let sql = "INSERT INTO tasks SET ?";
  // db.query(sql, details, (error) => {
  //   if (error) {
  //     res.send({ status: false, message: "Task created Failed" });
  //   } else {
  //     res.send({ status: true, message: "Task created successfully" });
  //   }
  // });
});

//Search the task

server.get("/api/task/:id", (req, res) => {
  let taskId = req.params.id;
  //json server
  let result = taskData.at(taskId);
  if (result) {
    res.send({ status: true, data: [result] });
  } else {
    res.send({ status: false, message: "Task not found" });
  }
  //sql
  // let sql = "SELECT * FROM tasks WHERE id=" + taskId;
  // db.query(sql, function (error, result) {
  //   if (error) {
  //     console.log("Error Connecting to DB");
  //   } else {
  //     res.send({ status: true, data: result });
  //   }
  // });
});

// //Update the Records

server.put("/api/task/update/:id", (req, res) => {
  let taskId = req.params.id;

  //json server
  taskData.at(taskId).title = req.body.title;
  taskData.at(taskId).description = req.body.description;
  taskData.at(taskId).long_description = req.body.long_description;
  taskData.at(taskId).status = req.body.status;
  res.send({ status: true, message: "Task Updated successfully" });
  // let sql =
  //   "UPDATE task SET title='" +
  //   req.body.title +
  //   "', description='" +
  //   req.body.description +
  //   "', long_description='" +
  //   req.body.long_description +
  //   "',status='" +
  //   req.body.status +
  //   "'  WHERE id=" +
  //   req.params.id;
  // let a = db.query(sql, (error, result) => {
  //   if (error) {
  //     res.send({ status: false, message: "Task Updated Failed" });
  //   } else {
  //     res.send({ status: true, message: "Task Updated successfully" });
  //   }
  // });
});

// //Delete the Records

server.delete("/api/task/delete/:id", (req, res) => {
  let taskId = req.params.id;

  //json server
  taskData.splice(taskId, 1);
  res.send({ status: true, message: "Task Deleted successfully" });

  //sql
  // let sql = "DELETE FROM tasks WHERE id=" + req.params.id + "";
  // let query = db.query(sql, (error) => {
  //   if (error) {
  //     res.send({ status: false, message: "Task Deleted Failed" });
  //   } else {
  //     res.send({ status: true, message: "Task Deleted successfully" });
  //   }
  // });
});

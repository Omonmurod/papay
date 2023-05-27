console.log("Web Serverni boshlash");
const express = require("express");
const app = express();

// MongoDB connect
const db = require("./server").db();
const mongodb = require("mongodb");

// 1: Entering codes
app.use(express.static("public")); //public folder har kim uchun ochiq
app.use(express.json()); //json formatdagi kelayotgan infoni objectga o'zgartirib beradi
app.use(express.urlencoded({extended: true}));  //HTML formda insert qilingan infoni express qabul qilishi un ishlatiladi

// 2: Codes based on SESSION

// 3: Views code (BSSR backend side server rendering backendda viewni yasab olyapmiz)
app.set("views", "views");
app.set("view engine", "ejs"); // view engine ejs ekanligi bildirildi

// 4: Rooting codes
module.exports = app;
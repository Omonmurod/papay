console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const router = require("./router.js");
const router_bssr = require("./router_bssr.js");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session); /* Tepadagi express sessionni berayapmiz */
const store = new MongoDBStore({ /* MongoDBStore bu class, u orqali store objectiga yasalyapti */
  uri: process.env.MONGO_URL, /* Objectning 1-qismiga MongoDB atlas URL berilyapti*/
  collection: "sessions",
});

// 1: Entering codes
app.use(express.static("public")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2: Codes based on SESSION
app.use(
  session({ /* session bu object */
    secret: process.env.SESSION_SECRET,  /* session secret kodi .env dan olib kelinyapti */
    cookie: {
      maxAge: 1000 * 60 * 30, /* bu 30 minut uchun ishlatilyapti */
    },
    store: store, /* Store object tepada MongoDB ga session collectionga store qilish */
    resave: true,
    saveUninitialized: true,
  })
);
app.use(function(req, res, next) {
  res.locals.member = req.session.member;  /* Har bir kelayotgan req browser ichiga yuborilyapti. 
  local ichidagi member objectda har bir authenticate bo'lgan user insoi bor */
  next();
});

// 3: Views code (BSSR backend side server rendering backendda viewni yasab olyapmiz)
app.set("views", "views");
app.set("view engine", "ejs"); 

// 4: Rooting codes
app.use("/resto", router_bssr);  //Admin va restoranlar uchun ishlatiladigan router EJS
app.use("/", router);   //REACT frontend userlar uchun kk

module.exports = app;
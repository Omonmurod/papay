const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URL;
mongoose.set('strictQuery', false); /* Depication error bermasligi un yozilgan */
mongoose.connect( /* Connect bu yerda MongoDB methodi */
  connectionString,  /* Connect bu yerda function, har bir userni o'zini connection stringi bor */
  {
    useNewUrlParser: true, /* Dokumentatsiya bo'yicha qarayapmiz xolos */
    useUnifiedTopology: true,
  }, 
  (err, goose) => {
    if(err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connection succeed!");
      //console.log(goose); /* Mongoose clientni beradi */
      const app = require("./app");   // Bu tepada chaqirilmaydimi
      const server = http.createServer(app);  //Bu shartmi
      let PORT = process.env.POT || 3013;
      server.listen(PORT, function() {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);


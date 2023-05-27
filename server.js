const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString = 
  "mongodb+srv://Jacob:Beshkent19920711@cluster0.wsdr7pe.mongodb.net/Papay";

mongodb.connect(
  connectionString, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }, 
  (err, client) => {
    if(err) console.log("ERROR on connection MongoDB");
    else {
      console.log("MongoDB connection succeed!");
      module.exports = client;  //????
      const app = require("./app");
      const server = http.createServer(app);  //barcha zarposlar shu yerga keladi(app bu yerda nodejs ning single thredi) app ExpressJS ni http protokolini serverda yaratib olish
      let PORT = 3013;
      //3000 portdan kelayotgan serverni listen qil listen bu method
      server.listen(PORT, function() {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);


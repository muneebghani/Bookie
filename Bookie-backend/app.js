require("dotenv").config();
module.exports.ROOT_DIRECTORY = __dirname;
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { RoleModel} = require("./models/roles")
//const userRoute = require("./routes/user")
// migration roles add in database  [{roleName: "Super admin" , id : 3214A},{roleName: "admin" , id : 3214A},{roleName: user , id : 3214A} ]
// migration superAdmin one user add in database  
// user model userTypeId 

const app = express();
 
const mongoose = require("mongoose");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(express.static(path.join(this.ROOT_DIRECTORY, "uploads")));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes

// app.use("/migrations", require("./routes/migration"));
app.use("/", require("./routes/user"));
app.use("/admin", require("./routes/admin"));
app.use("/user", require("./routes/user"));
// app.use('/user' , userRoute)

// error
app.use((error, req, res, next) => {
  console.log("ERROR OCCURED", error.message, error.stack);
  res.json({
    success: false,
    error: {
      code: error.status,
      message: error.message,
    },
  });
});
function migrationRunRoles(req, res, next) {
  let roles = [
    { name: "Super admin", id: '3214A' },
    { name: "admin", id: "321856A" },
    { name: "user", id: "324523A" }
  ]

  roles.forEach(async (item) => {
    const role = await new RoleModel({
      id: item.id,
      name: item.name
    }).save();
  })

}




// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log("Server Started on port " + PORT);
  // await mongoose.connect("mongodb://munib:123abcd@ds161901.mlab.com:61901/testingdb", {
  await mongoose.connect("mongodb://127.0.0.1:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }
  );

  // migrationRunRoles();
  console.log("Connected to DB");


});





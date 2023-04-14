const express = require ("express")
const dotenv = require("dotenv")
const unless = require ("express-unless")
const mongoose = require ("mongoose")

const auth = require ("./middleware/auth")
const errors = require ("./middleware/errors")


const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));


auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/welcome", methods: ["POST"] },
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
    ],
  })
);

app.use(express.json())

app.use("/users", require("./routes/users.routes"));
app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function () {
  console.log("Server Connected");
});

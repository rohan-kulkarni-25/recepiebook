require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT;

connectDB();


app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("debug", true);

async function main() {
  await mongoose.connect(process.env.MONGO_CONN_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log("MongoDB database connection established successfully");
}

main();

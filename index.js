const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

dotenv.config();
mongoose.set("debug", true);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// Connect to the database and run the server
mongoose
  .connect(process.env.MONGO_CONN_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB database connection established successfully");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  });

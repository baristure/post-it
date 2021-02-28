const { ApolloServer,PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

dotenv.config();
mongoose.set("debug", true);

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req ,pubsub }),
});
const PORT = process.env.PORT || 5000;
// Connect to the database and run the server
mongoose
  .connect(process.env.MONGO_CONN_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB database connection established successfully");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://investments:investments@algocluster.uwe8h.mongodb.net/enteries?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client;

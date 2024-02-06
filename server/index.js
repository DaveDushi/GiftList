const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "76cc2112a99f7c73989646f858736732c9c232e0c3950ada94a095b9b25ff021";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name, root } = req.body;

  const isInTheList = verifyProof(proof, name, root);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

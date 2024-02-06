const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // Check if the user has provided an argument
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  let name = "";

  // get the name from the user
  if (process.argv.length < 3) {
    console.log("Please provide an argument.");
  } else {
    // Get the user input (argument)
    name = process.argv[2];
  }

  // get the index of the name
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
    root,
  });

  console.log({ gift });
}

main();

const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const EthCrypto = require("eth-crypto");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xd44faFDb4a9e3398d2ea20cdbC4EFF0D38Ba0d57": 100, //kenny
  "0x52B842E6C2cfA667C400eb394A113EC3d427Fd85": 50, //al
  "0xb6f8C36DA833B1B011f44B8cD271F048f78E0c48": 75, //dan
};

//do a public key storage object

app.get("/balance/:publicKey", (req, res) => {
  //TODO: get a signature from the client-side application
  //recover the adress from the signature;

  const { publicKey } = req.params;

  const address = EthCrypto.publicKey.toAddress(publicKey);
  const balance = balances[address] || 0;
  res.send({ balance, address });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, msg, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const signer = EthCrypto.recover(
    signature,
    EthCrypto.hash.keccak256(msg) // signed message hash
  );
  if (signer === sender) {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Authentication failed" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

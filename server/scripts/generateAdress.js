const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const EthCrypto = require("eth-crypto");

const kenny = {
  privateKey:
    "ba61d9a471148f717398a0d867528a8ac59a63b21474318b9c5dba8086061543",
  publicKey:
    "03129039139776db0415fc9b512a92d285157c7abff51dacf1a3ada9af7546c29c",
  address: "0xd44faFDb4a9e3398d2ea20cdbC4EFF0D38Ba0d57",

  authSignature:
    "0x763afd4cec576602af36dd4b2058aab22fd1430380275ae5b35fccd7ab5f9c92513916c24ee494f03bf8b95853224e703bfa15465b7ccc15819556ac96eadaad1b",
};

const al = {
  privateKey:
    "4648d4872efd53d39716c0bb6b104f1307d3a43f38901b374ad82661758f67f8",
  publicKey:
    "034bce27a380e18b0effdb28178a07a2485b78c9c86dd5118f815ee2e06fb293c5",
  address: "0x52B842E6C2cfA667C400eb394A113EC3d427Fd85",
  authSignature:
    "0xea0cd225aa46cd906b6750a7f4005d2365cdade7e619e9b639bf0ac08d34f2627a2b2adab39008389b23db4ee44e6e58eb35d1abfbf9a35fa3ccd91f261e089d1b",
};

const dan = {
  privateKey:
    "79ae9aa3993bff1a78c14c26fb945800c5f1a68b63bdef920d1335bb1151bec8",
  publicKey:
    "0279cb9d33b49c9dd0512a6f4a6faa20c0f1264e1be5d63ee40a826f6d24707306",
  address: "0xb6f8C36DA833B1B011f44B8cD271F048f78E0c48",
  authSignature:
    "0xf35d0589f95552058000e1f05398481f8e84b20bb0014268e46f0d4fbc9a95a50487756d60903b08ed512f6a90a49a7855d2702c58c2f4f3e28d94a939b2999e1c",
};

/*let _publicKey = EthCrypto.publicKeyByPrivateKey(
  "79ae9aa3993bff1a78c14c26fb945800c5f1a68b63bdef920d1335bb1151bec8"    used this method from the EthCrypto to generate the public keys and adresses
);*/ //I verified them with the secp library, they generated the same results

/*_publicKey = EthCrypto.publicKey.compress(_publicKey);

console.log(_publicKey);

const address = EthCrypto.publicKey.toAddress(_publicKey);

console.log(address);*/

const signature = EthCrypto.sign(
  "79ae9aa3993bff1a78c14c26fb945800c5f1a68b63bdef920d1335bb1151bec8", // privateKey
  EthCrypto.hash.keccak256("I am dan") // hash of message
);

console.log(signature);

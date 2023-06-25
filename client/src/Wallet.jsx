import server from "./server";

function Address({address}){
  if (address){
    return (<div>Address: {address}</div>);
  }
  return null;
}



function Wallet({ publicKey, setPublicKey, balance, setBalance, address, setAdress }) {
  async function onChange(evt) {
    const publicKey = evt.target.value;

//do the signature verification here, and derive the adress from the public key/   public keys should be stored in the backend//


    setPublicKey(publicKey);
    if (publicKey) {
      const {
        data: {balance, address},
      } = await server.get(`balance/${publicKey}`);  
      setAdress(address);
      setBalance(balance);
    } else {
      setAdress("");
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Compressed Public Key
        <input placeholder="Type a publicKey, for example: 1ed03" value={publicKey} onChange={onChange}></input>
      </label>
      <Address address={address}/>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [msg, setMsg] = useState("");

  const setValue = (setter) => {
    // Return an arrow function that takes an `evt` parameter
    return (evt) => {
      // Extract the value from the target element of the event
      const value = evt.target.value;
      
      // Call the provided `setter` function with the extracted value
      setter(value);
    };
  };

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        msg,
        signature,
        
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        Authentication Message
        <input placeholder='I am [username]'
        value = {msg}
        onChange={setValue(setMsg)}
        ></input>
      </label>

      <label>
        Signature
        <input placeholder='input the signature corresponding to the above message'
        value = {signature}
        onChange={setValue(setSignature)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

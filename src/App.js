import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export const App = () => {
  const [crypto, setCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [currency, setCurrency] = useState("eur");

  const handleCryptoSelect = (e) => {
    const crypto = e.target.value;
    setCrypto(crypto);
  };

  const handleAmountInput = (e) => {
    const amount = e.target.value;
    setAmount(amount);
  };

  const handleCurrencySelect = (e) => {
    const currency = e.target.value;
    setCurrency(currency);
  };

  const convertCurrency = async (e) => {
    e.preventDefault();
    if (crypto === "" || amount === "" || amount <= 0) {
      setResult("Please fill all fields correctly");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}&amount=${amount}`
      );
      const result = response.data[crypto][currency] * amount;
      const formatDE = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(result);
      const formatUS = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(result);
      setResult(
        currency === "eur"
          ? `${amount} ${crypto.toUpperCase()} = ${formatDE}`
          : `${amount} ${crypto.toUpperCase()} = ${formatUS}`
      );
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  const STYLES = {
    showResult: {
      fontSize: "1.25rem",
      textAlign: "center",
      padding: "1rem 2rem",
      backgroundColor: "#fff",
      boxShadow: "inset 0 0 10px 5px rgba(0, 0, 0, 0.5)",
    },
    result: {
      backgroundColor: "#firebrick",
      color: "#fff",
    },
  };

  return (
    <div className='App'>
      <h1 className='header'>Crypto-Currencies</h1>
      {result && (
        <div className='container' style={STYLES.showResult}>
          <h2 className='result'>{result}</h2>
        </div>
      )}
      <form className='form'>
        {/* {!crypto && (
          <div className='crypto'>
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto}.png`}
              alt='crypto'
            />
            <h2>{crypto.toUpperCase()}</h2>
          </div>
        )} */}
        <select
          required
          className='select'
          name='crypto'
          onChange={handleCryptoSelect}
        >
          <option value=''>Select Cryptocurrency</option>
          <option value='bitcoin'>Bitcoin (BTC)</option>
          <option value='ethereum'>Ethereum (ETH)</option>
          <option value='cardano'>Cardano (ADA)</option>
          <option value='ripple'>Ripple (XRP)</option>
          <option value='litecoin'>Litecoin (LTC)</option>
        </select>
        <select
          required
          className='select'
          name='currency'
          onChange={handleCurrencySelect}
        >
          <option value=''>Select Currency</option>
          <option value='eur'>EUR</option>
          <option value='usd'>USD</option>
        </select>
        <input
          min={0}
          required
          className='input'
          type='number'
          placeholder='Amount'
          onChange={handleAmountInput}
        />
        <button className='submit-btn' type='submit' onClick={convertCurrency}>
          Convert
        </button>
      </form>
    </div>
  );
};

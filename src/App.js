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
      setResult("Please select a cryptocurrency and enter an amount.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}&amount=${amount}`
      );
      const result = response.data[crypto][currency] * amount;
      const NumberFormatDE = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(result);
      const NumberFormatUS = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(result);
      setResult(
        currency === "eur"
          ? `${amount} ${crypto.toUpperCase()} = ${NumberFormatDE}`
          : `${amount} ${crypto.toUpperCase()} = ${NumberFormatUS}`
      );
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  const STYLES = {
    showResult: {
      fontSize: "1.25rem",
      textAlign: "center",
      backgroundColor: "#fff",
      padding: "1rem 2rem",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    },
    inputField: {
      display: "block",
      width: "100%",
      textAlign: "center",
      padding: "1rem",
      borderRadius: "0.25rem",
      border: "1px solid #ccc",
      fontSize: "1.25rem",
      color: "#555",
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
        <select
          required
          className='select-crypto'
          name='select-crypto'
          onChange={handleCryptoSelect}
          style={STYLES.inputField}
        >
          <option value=''>Choose a cryptocurrency</option>
          <option value='bitcoin'>Bitcoin (BTC)</option>
          <option value='ethereum'>Ethereum (ETH)</option>
          <option value='cardano'>Cardano (ADA)</option>
          <option value='ripple'>Ripple (XRP)</option>
          <option value='litecoin'>Litecoin (LTC)</option>
        </select>
        <input
          min={0}
          required
          className='form-input'
          type='number'
          placeholder='Amount'
          onChange={handleAmountInput}
          style={STYLES.inputField}
        />
        <select
          required
          className='select-currency'
          name='select-currency'
          onChange={handleCurrencySelect}
          style={STYLES.inputField}
        >
          <option className='select' value='eur'>
            EUR
          </option>
          <option className='select' value='usd'>
            USD
          </option>
        </select>
        <button
          className='form-submit-btn'
          type='submit'
          onClick={convertCurrency}
        >
          Convert
        </button>
      </form>
    </div>
  );
};

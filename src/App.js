import React, { useState } from "react";
import "./App.css";

export const App = () => {
  const API_KEY = process.env.REACT_APP_ACCESS_KEY;
  const [convertFrom, setConvertFrom] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const handleCurrencyFrom = (e) => {
    const from = e.target.value;
    setConvertFrom(from.toUpperCase());
  };

  const handleCurrencyAmount = (e) => {
    const amount = e.target.value;
    setAmount(amount);
  };

  const swapDotAndComma = (number) => {
    const replaceDotWithSpace = number.replace(".", " ");
    const replaceCommaWithDot = replaceDotWithSpace.replace(/,/g, ".");
    const replaceSpaceWithComma = replaceCommaWithDot.replace(" ", ",");
    return replaceSpaceWithComma;
  };

  const convertCurrency = async (e) => {
    if (convertFrom === "" || amount === "" || amount <= 0) {
      setResult("Please  choose a crypto and enter an amount");
      return;
    }
    try {
      e.preventDefault();
      const APIURL = `https://api.coinlayer.com/api/live?access_key=${API_KEY}`;
      const fetchURL = `${APIURL}&from=${convertFrom.toUpperCase()}&amount=${amount}`;
      const responseData = await fetch(fetchURL);
      if (!responseData.ok) {
        throw new Error("API response is unsuccessful");
      }
      const jsonData = await responseData.json();
      if (jsonData.error) {
        throw new Error(jsonData.error.info);
      }
      const convertResult = (await jsonData.rates[convertFrom]) * amount;
      const replaceDotToComma = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(convertResult);
      setResult(replaceDotToComma);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  const pluralOrSingular = (amount) => {
    const result =
      convertFrom !== "" &&
      amount !== "" &&
      (amount !== "1"
        ? `${amount} ${convertFrom}'s`
        : `${amount} ${convertFrom}`);
    return result;
  };

  return (
    <div className='App'>
      <h1 className='header'>Crypto Converter</h1>
      <div className='container'>
        <h2 className='result'>{result !== "0" && pluralOrSingular(amount)}</h2>
        <h2 className='result usd'>
          {result !== "0" && swapDotAndComma(result)}
        </h2>
      </div>
      <form className='form' action='#'>
        <select
          required
          className='select-crypto'
          name='select-crypto'
          onChange={handleCurrencyFrom}
        >
          <option value=''>Choose a crypto</option>
          <option value='btc'>BTC - Bitcoin </option>
          <option value='eth'>ETH - Ethereum </option>
          <option value='ada'>ADA - Cardano </option>
          <option value='xrp'>XRP - Ripple </option>
          <option value='ltc'>LTC - Litecoin </option>
        </select>
        <input
          min={0}
          required
          className='form-input'
          type='number'
          placeholder='Amount'
          onChange={handleCurrencyAmount}
        />
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

import React, { useState } from "react";
import "./App.css";

export const App = () => {
  const API_KEY = process.env.REACT_APP_ACCESS_KEY;
  const [convertFrom, setConvertFrom] = useState("");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);

  const handleCurrencyFrom = (e) => {
    const from = e.target.value;
    setConvertFrom(from.toUpperCase());
  };

  const handleCurrencyAmount = (e) => {
    const amount = e.target.value;
    setAmount(amount);
  };

  const convertCurrency = async (e) => {
    e.preventDefault();
    const APIURL = `http://api.coinlayer.com/api/live?access_key=${API_KEY}`;
    const fetchURL = `${APIURL}&from=${convertFrom.toUpperCase()}&amount=${amount}`;
    const responseData = await fetch(fetchURL);
    const jsonData = await responseData.json();
    const convertResult = jsonData.rates[convertFrom] * amount;
    const replaceDotToComma = convertResult.toString().split(".").join(",");
    const handleNaN =
      replaceDotToComma === 0 ? !replaceDotToComma : replaceDotToComma;
    setResult(handleNaN);
  };

  return (
    <div className='App'>
      <h1 className='header'>Crypto Converter</h1>
      <h2 className='result'>{result && `$ ${result}`}</h2>
      <form className='form' action='#'>
        <div className='wrapper'>
          <select
            className='select-crypto'
            name='select-crypto'
            onChange={handleCurrencyFrom}
          >
            <option className='option-crypto'>Select</option>
            <option className='option-crypto' value='btc'>
              BTC
            </option>
            <option className='option-crypto' value='eth'>
              ETH
            </option>
            <option className='option-crypto' value='ada'>
              ADA
            </option>
            <option className='option-crypto' value='xrp'>
              XRP
            </option>
            <option className='option-crypto' value='ltc'>
              LTC
            </option>
          </select>
          <input
            required
            className='form-input'
            type='number'
            placeholder='Amount'
            onChange={handleCurrencyAmount}
          />
        </div>
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

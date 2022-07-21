import React, { useState } from "react";

const API_KEY = process.env.REACT_APP_ACCESS_KEY;

const Converter = () => {
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
    console.log(convertResult);
    setResult(convertResult);
  };

  return (
    <>
      <h1 className="header">Crypto Converter</h1>
      <form className="form" action="#">
        <div className="outer_wrapper">
          <div className="inner_wrapper">
            <select className="option_crypto" name="option_crypto" onChange={handleCurrencyFrom}>
              <option className="option_crypto">Select</option>
              <option className="option_crypto" value="btc">BTC</option>
              <option className="option_crypto" value="eth">ETH</option>
              <option className="option_crypto" value="ada">ADA</option>
              <option className="option_crypto" value="xrp">XRP</option>
              <option className="option_crypto" value="ltc">LTC</option>
            </select>
          </div>
          <input className="form_input" type="text" placeholder="enter" onChange={handleCurrencyAmount} />
        </div>
        <h2>{result}</h2>
        <button id="form_submit_btn" type="submit" onClick={convertCurrency}>Convert</button>
      </form>
    </>
  );
};

export default Converter;

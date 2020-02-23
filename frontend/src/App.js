import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'

function App() {

  const [product, setProduct] = useState({
    name: 'React from fb',
    price: 10,
    productBy: 'FB'
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }

    const headers = {
      'Content - Type': 'application/json'
    }

    return fetch('http://localhost:8000/payment', {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    .then(response => {
      console.log('RESPONSE', Response)
      const {status} = response
      console.log('STATUS', status)
    })
    .catch(err => console.log(err))
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {console.log(process.env.REACT_APP_KEY)}

        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name='Buy React'
          amount={product.price * 100}
        >
          <button className='btn-large pink'>Buy React At Just ${product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;

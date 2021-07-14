import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { getBalance } = useContext(GlobalContext);

  return (
    <div>
      <h4>YOUR BALANCE</h4>
      <h1> ${getBalance()} </h1>
    </div>
  )
}

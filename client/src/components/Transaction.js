import React, { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";

const Transaction = ({transaction}) => {
  const {deleteTransaction} = useContext(GlobalContext);

  return (
    <li className={transaction.amount > 0 ? 'plus' : 'minus'}>
      {transaction.text} <span>${Math.abs(transaction.amount)}</span> <button
      onClick={() => deleteTransaction(transaction._id)} className = "delete-btn">x</button>
    </li>
  )
}

export default Transaction;

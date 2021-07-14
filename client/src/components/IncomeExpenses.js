import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const IncomeExpenses = () => {
  const { getIncome, getExpense } = useContext(GlobalContext);
  
  return (
    <div className = "inc-exp-container">
      <div>
        <h4>INCOME</h4>
        <p className="money plus">${getIncome()}</p>
      </div>
      <div>
        <h4>EXPENSE</h4>
        <p className="money minus">${getExpense()}</p>
      </div>
    </div>
  )
}

export default IncomeExpenses;

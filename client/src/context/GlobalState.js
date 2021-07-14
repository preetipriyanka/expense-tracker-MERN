import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const initialState = {
  transactions: [],
  error: null,
  loading: true
}

// create context
export const GlobalContext = createContext(initialState);

//Provider Component

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions we are taking here in app
  async function getTransactions() {
    try {
      const res = await axios.get('api/v1/transactions');

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      });
    } catch(err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    })
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    })
  }

  function getBalance() {
    if(state.transactions != null || state.transactions.length > 0) {
      return state.transactions.reduce((totalBalance, transaction) => totalBalance + transaction.amount, 0);
    } 
    return 0;
  }

  function getIncome() {
    if(state.transactions !=null || state.transactions.length > 0) {
      let totalIncome = state.transactions.reduce((totalBalance, transaction) => {
        if(transaction.amount > 0) {
          return totalBalance + transaction.amount;
        }
        return totalBalance;
      }, 0);
      return totalIncome;
    }
    return 0;
  }

  function getExpense() {
    if(state.transactions !=null || state.transactions.length > 0) {
      let totalExpense = state.transactions.reduce((totalBalance, transaction) => {
        if(transaction.amount < 0) {
          return totalBalance + transaction.amount;
        }
        return totalBalance;
      }, 0);
      return totalExpense;
    }
    return 0;
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      getTransactions,
      deleteTransaction,
      addTransaction,
      getBalance,
      getIncome,
      getExpense
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

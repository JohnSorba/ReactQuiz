// import "./styles.css";
import { useReducer } from "react";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const bankStyle = {
  fontFamily: "sansSerif",
  textAlign: "center",
};

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

// openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount
function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: state.balance === 0 ? state.balance + 500 : state.balance,
        isActive: true,
      };

    case "deposit":
      return {
        ...state,
        balance: state.balance + 150,
      };
    case "withdraw":
      return {
        ...state,
        balance: state.balance === 0 ? state.balance : state.balance - 50,
      };
    case "loanRequest":
      return {
        ...state,
        balance: state.loan === 5000 ? state.balance : state.balance + 5000,
        loan: state.loan === 5000 ? state.loan : state.loan + 5000,
      };
    case "payLoan":
      return {
        ...state,
        balance:
          state.balance >= 5000 ? state.balance - state.loan : state.balance,
        loan: state.balance >= 5000 ? 0 : state.loan,
      };
    case "closeAccount":
      return {
        // ...initialState,
        isActive:
          state.loan === 0 && state.balance === 0
            ? state.isActive === false
            : state.isActive === true,
        balance: state.balance,
        loan: state.loan,
      };

    default:
      console.log("default value");
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className={{ bankStyle }}>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive ? true : false}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit" })}
          disabled={!isActive ? true : false}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw" })}
          disabled={!isActive ? true : false}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "loanRequest" })}
          disabled={!isActive ? true : false}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isActive ? true : false}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive ? true : false}
        >
          {console.log(isActive)}
          Close account
        </button>
      </p>
    </div>
  );
}

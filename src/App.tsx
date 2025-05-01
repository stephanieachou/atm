import { useCallback, useState } from "react";
import Account from "./assets/features/atm/components/Account";
import Login from "./assets/features/atm/components/Login";
import PinPad from "./assets/features/atm/components/PinPad";
import "./styles.css";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    currentBalance: 0,
    dailyWithdrawalTotal: 0,
    dailyWithdrawalLimit: 0,
  });
  const [currentAction, setAccountAction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePinPad = useCallback(
    async (value: string | number, accountAction?: string) => {
      if (
        (typeof value === "string" && value.length) ||
        (typeof value === "number" && value > 0)
      ) {
        if (authenticated) {
          if (accountAction === "balanceChange" && typeof value === "number") {
            const res = await updateUser(currentUser.id, value);
            if (res instanceof Error) {
              setErrorMessage(res.message || "An unexpected error occurred");
            } else {
              setErrorMessage("");
              setCurrentUser(res);
              setAccountAction("");
            }
          }
        } else if (typeof value === "string" && value.length) {
          const res = await getUser(value);
          if (res instanceof Error) {
            setErrorMessage(res.message || "An unexpected error occurred");
          } else {
            setErrorMessage("");
            setCurrentUser(res);
            setAuthenticated(true);
          }
        }
      }
    },
    [authenticated, currentUser, currentAction]
  );

  const getUser = async (id: string) => {
    try {
      const res = await fetch(`/api/user/${id}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      return data.user;
    } catch (err) {
      return err;
    }
  };

  const updateUser = async (id: string, amount: number) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: currentAction, amount }),
      });
      if (!res.ok) {
        throw new Error(`Error updating user (${res.status})`);
      }
      const data = await res.json();
      return data.user;
    } catch (err) {
      return err;
    }
  };

  const handleAccountAction = useCallback((nextAction: string) => {
    if (nextAction === "endSession" || nextAction === "cancel") {
      if (nextAction === "endSession") {
        setAuthenticated(false);
        setCurrentUser({
          id: "",
          currentBalance: 0,
          dailyWithdrawalTotal: 0,
          dailyWithdrawalLimit: 0,
        });
      }
      setAccountAction("");
    } else {
      setAccountAction(nextAction);
    }
  }, []);

  return (
    <div className="App">
      <div id="atm">
        {authenticated ? (
          <Account
            currentAction={currentAction}
            currentBalance={currentUser.currentBalance}
            callback={handleAccountAction}
          />
        ) : (
          <Login />
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <PinPad
          callback={handlePinPad}
          authenticated={authenticated}
          currentAction={currentAction}
          dailyWithdrawalTotal={currentUser.dailyWithdrawalTotal}
          dailyWithdrawalLimit={currentUser.dailyWithdrawalLimit}
          currentBalance={currentUser.currentBalance}
        />
      </div>
    </div>
  );
}

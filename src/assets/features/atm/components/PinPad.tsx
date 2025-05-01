import { memo, useCallback, useState } from "react";
import NumberPad from "./NumberPad";
import PinPadActions from "./PinPadActions";
import PinPadEntry from "./PinPadEntry";

type PinPadProps = {
  authenticated: boolean;
  callback: (value: string | number, accountActionType?: string) => void;
  currentAction?: string;
  currentBalance: number;
  dailyWithdrawalTotal: number;
  dailyWithdrawalLimit: number;
};

function PinPad({
  authenticated,
  callback,
  currentAction,
  currentBalance,
  dailyWithdrawalTotal,
  dailyWithdrawalLimit,
}: PinPadProps) {
  const [pinEntry, setPinEntry] = useState("");
  const [changeAmount, setChangeAmount] = useState(0);

  const handleEnter = useCallback(() => {
    if (authenticated) {
      callback(changeAmount, "balanceChange");
      setChangeAmount(0);
    } else {
      callback(pinEntry);
      setPinEntry("");
    }
  }, [authenticated, changeAmount, pinEntry, callback, currentAction]);

  const handleClear = useCallback(() => {
    if (authenticated) {
      setChangeAmount(0);
    } else {
      setPinEntry("");
    }
  }, [authenticated]);

  const handleCancel = useCallback(() => {
    if (authenticated) {
      setChangeAmount(0);
    } else {
      setPinEntry("");
    }
  }, []);

  const handleNumberPadClick = useCallback(
    (value: string) => {
      if (value === "+") {
      } else if (value === "-") {
        if (authenticated) {
        } else {
          setPinEntry((prev) => prev.slice(0, -1));
        }
      } else {
        if (authenticated) {
          setChangeAmount((prev) => {
            const nextAmount = parseInt(`${prev || ""}${value}`, 10);
            const actionValid =
              currentAction === "deposit" ||
              (currentAction === "withdrawal" &&
                currentBalance - nextAmount <= currentBalance &&
                dailyWithdrawalLimit >= nextAmount);
            if (actionValid) {
            }
            return actionValid ? nextAmount : prev;
          });
        } else {
          setPinEntry((prev) => (prev.length >= 4 ? prev : prev.concat(value)));
        }
      }
    },
    [authenticated, currentAction, currentBalance]
  );

  const isEnterDisabled = authenticated
    ? changeAmount === 0 ||
      !currentAction ||
      (currentAction === "withdrawal" &&
        dailyWithdrawalLimit - dailyWithdrawalTotal - changeAmount < 0)
    : pinEntry.length < 4;
  const isClearDisabled = authenticated
    ? changeAmount === 0
    : pinEntry.length === 0;
  const isCancelDisabled = authenticated ? true : pinEntry.length === 0;

  return (
    <div id="pin-pad-container">
      <PinPadEntry
        authenticated={authenticated}
        currentAction={currentAction}
        changeAmount={changeAmount}
        currentBalance={currentBalance}
        pinEntry={pinEntry}
        dailyWithdrawalTotal={dailyWithdrawalTotal}
        dailyWithdrawalLimit={dailyWithdrawalLimit}
      />
      <div id="pin-pad">
        {authenticated && !currentAction && <div className="overlay" />}
        <NumberPad onClick={handleNumberPadClick} />
        <PinPadActions
          handleEnter={handleEnter}
          handleClear={handleClear}
          handleCancel={handleCancel}
          isEnterDisabled={isEnterDisabled}
          isClearDisabled={isClearDisabled}
          isCancelDisabled={isCancelDisabled}
        />
      </div>
    </div>
  );
}

export default memo(PinPad);

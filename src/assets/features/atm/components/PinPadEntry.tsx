import { memo } from "react";

type PinPadEntryProps = {
  authenticated: boolean;
  changeAmount: number;
  currentBalance: number;
  currentAction?: string;
  dailyWithdrawalTotal: number;
  pinEntry?: string;
  dailyWithdrawalLimit: number;
};

function PinPadEntry({
  authenticated,
  changeAmount,
  currentAction,
  currentBalance,
  dailyWithdrawalTotal,
  pinEntry,
  dailyWithdrawalLimit,
}: PinPadEntryProps) {
  const formattedAction = currentAction
    ? `${currentAction.charAt(0).toUpperCase()}${currentAction.slice(1)}`
    : "";
  const remainingWithdrawal = dailyWithdrawalLimit - dailyWithdrawalTotal;

  return (
    <div id="pin-pad-entry-container">
      {authenticated ? (
        <div className="amounts-container">
          {currentAction && (
            <div>
              <strong>{`${formattedAction} Amount`}</strong>
              <div id="change-amount">
                {changeAmount !== 0
                  ? `$${changeAmount.toLocaleString()}`
                  : "--"}
              </div>
            </div>
          )}
          {currentAction === "withdrawal" && (
            <div>
              {remainingWithdrawal <= 0 ? (
                <div className="error-message">
                  You've reached your withdrawal limit for today.
                </div>
              ) : (
                <div id="max-withdrawal" className="box-wrapper">
                  You can withdraw up to{" "}
                  <span className="amount">
                    {`$${Math.min(
                      currentBalance,
                      remainingWithdrawal
                    ).toLocaleString()}`}
                  </span>{" "}
                  today.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div id="pin-entry">{(pinEntry || "").replace(/./g, "*")}</div>
      )}
    </div>
  );
}

export default memo(PinPadEntry);

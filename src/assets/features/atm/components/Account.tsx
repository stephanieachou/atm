import { useCallback } from "react";
import Button from "../../../components/Button";
import AccountBalance from "./AccountBalance";

type AccountProps = {
  callback: (action: string) => void;
  currentAction: string;
  currentBalance: number;
};

function Account({ callback, currentAction, currentBalance }: AccountProps) {
  const handleWithdrawal = useCallback(
    () => callback("withdrawal"),
    [callback]
  );
  const handleDeposit = useCallback(() => callback("deposit"), [callback]);
  const handleCancel = useCallback(() => callback("cancel"), [callback]);
  const handleEndSession = useCallback(
    () => callback("endSession"),
    [callback]
  );

  const isWithdrawalDisabled =
    currentAction === "withdrawal" || currentBalance <= 0;
  const isDepositDisabled = currentAction === "deposit";
  const isCancelDisabled = currentAction.length === 0;

  return (
    <div id="account">
      <div className="header">
        Welcome back!
        <AccountBalance currentBalance={currentBalance} />
      </div>
      <div id="selection-container" className="box-wrapper">
        Make a selection:
        <div className="button-group">
          <Button
            id="withdrawal"
            onClick={handleWithdrawal}
            disabled={isWithdrawalDisabled}
          >
            Withdrawal
          </Button>
          <Button
            id="deposit"
            onClick={handleDeposit}
            disabled={isDepositDisabled}
          >
            Deposit
          </Button>
          <Button
            id="cancel"
            onClick={handleCancel}
            disabled={isCancelDisabled}
          >
            Cancel
          </Button>
          <Button id="endSession" onClick={handleEndSession}>
            End Session
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Account;

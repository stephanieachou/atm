import { useState } from "react";

type AccountBalanceProps = {
  currentBalance: number;
};

function AccountBalance({ currentBalance }: AccountBalanceProps) {
  return (
    <div id="account-balance">Balance: ${currentBalance.toLocaleString()}</div>
  );
}

export default AccountBalance;

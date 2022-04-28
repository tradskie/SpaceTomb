import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {Bank} from '../space-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';

const useWithdraw = (bank: Bank) => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        spaceFinance.unstake(bank.contract, bank.poolId, amountBn),
        `Withdraw ${amount} ${bank.depositTokenName} from ${bank.contract}`,
      );
    },
    [bank, spaceFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdraw;

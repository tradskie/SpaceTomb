import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {Bank} from '../space-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';

const useStake = (bank: Bank) => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, bank.depositToken.decimal);
      handleTransactionReceipt(
        spaceFinance.stake(bank.contract, bank.poolId, amountBn),
        `Stake ${amount} ${bank.depositTokenName} to ${bank.contract}`,
      );
    },
    [bank, spaceFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStake;

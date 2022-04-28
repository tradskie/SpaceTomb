import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {Bank} from '../space-finance';

const useHarvest = (bank: Bank) => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      spaceFinance.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, spaceFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvest;

import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {Bank} from '../space-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(spaceFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, spaceFinance, handleTransactionReceipt]);

  return {onRedeem: handleRedeem};
};

export default useRedeem;

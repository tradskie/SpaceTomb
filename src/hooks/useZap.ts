import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {Bank} from '../space-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZap = (bank: Bank) => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        spaceFinance.zapIn(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, spaceFinance, handleTransactionReceipt],
  );
  return {onZap: handleZap};
};

export default useZap;

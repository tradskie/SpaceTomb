import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromBoardroom = () => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        spaceFinance.withdrawShareFromBoardroom(amount),
        `Withdraw ${amount} SSHARE from the boardroom`,
      );
    },
    [spaceFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdrawFromBoardroom;

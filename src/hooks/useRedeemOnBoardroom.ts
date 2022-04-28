import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnBoardroom = (description?: string) => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem SSHARE from Boardroom';
    handleTransactionReceipt(spaceFinance.exitFromBoardroom(), alertDesc);
  }, [spaceFinance, description, handleTransactionReceipt]);
  return {onRedeem: handleRedeem};
};

export default useRedeemOnBoardroom;

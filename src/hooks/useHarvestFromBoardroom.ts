import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromBoardroom = () => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(spaceFinance.harvestCashFromBoardroom(), 'Claim SPACE from Boardroom');
  }, [spaceFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvestFromBoardroom;

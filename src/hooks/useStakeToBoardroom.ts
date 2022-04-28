import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToBoardroom = () => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(spaceFinance.stakeShareToBoardroom(amount), `Stake ${amount} SSHARE to the boardroom`);
    },
    [spaceFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStakeToBoardroom;

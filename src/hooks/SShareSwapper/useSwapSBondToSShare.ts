import {useCallback} from 'react';
import useSpaceFinance from '../useSpaceFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import {parseUnits} from 'ethers/lib/utils';

const useSwapSBondToSShare = () => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapSShare = useCallback(
    (sbondAmount: string) => {
      const sbondAmountBn = parseUnits(sbondAmount, 18);
      handleTransactionReceipt(spaceFinance.swapSBondToSShare(sbondAmountBn), `Swap ${sbondAmount} SBond to SShare`);
    },
    [spaceFinance, handleTransactionReceipt],
  );
  return {onSwapSShare: handleSwapSShare};
};

export default useSwapSBondToSShare;

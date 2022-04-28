import {useCallback, useEffect, useState} from 'react';
import useSpaceFinance from '../useSpaceFinance';
import {useWallet} from 'use-wallet';
import {BigNumber} from 'ethers';
import {parseUnits} from 'ethers/lib/utils';

const useEstimateSShare = (sbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const {account} = useWallet();
  const spaceFinance = useSpaceFinance();

  const estimateAmountOfSShare = useCallback(async () => {
    const sbondAmountBn = parseUnits(sbondAmount);
    const amount = await spaceFinance.estimateAmountOfSShare(sbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfSShare().catch((err) => console.error(`Failed to get estimateAmountOfSShare: ${err.stack}`));
    }
  }, [account, estimateAmountOfSShare]);

  return estimateAmount;
};

export default useEstimateSShare;

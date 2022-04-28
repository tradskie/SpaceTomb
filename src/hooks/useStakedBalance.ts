import {useCallback, useEffect, useState} from 'react';

import {BigNumber} from 'ethers';
import useSpaceFinance from './useSpaceFinance';
import {ContractName} from '../space-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();
  const isUnlocked = spaceFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await spaceFinance.stakedBalanceOnBank(poolName, poolId, spaceFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, spaceFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, spaceFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;

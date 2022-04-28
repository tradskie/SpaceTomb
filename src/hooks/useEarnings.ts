import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSpaceFinance from './useSpaceFinance';
import {ContractName} from '../space-finance';
import config from '../config';

const useEarnings = (poolName: ContractName, earnTokenName: String, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();
  const isUnlocked = spaceFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await spaceFinance.earnedFromBank(poolName, earnTokenName, poolId, spaceFinance.myAccount);
    setBalance(balance);
  }, [poolName, earnTokenName, poolId, spaceFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, spaceFinance, fetchBalance]);

  return balance;
};

export default useEarnings;

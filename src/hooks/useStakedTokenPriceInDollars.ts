import {useCallback, useEffect, useState} from 'react';

import useSpaceFinance from './useSpaceFinance';
import config from '../config';
import ERC20 from '../space-finance/ERC20';

const useStakedTokenPriceInDollars = (stakedTokenName: string, stakedToken: ERC20) => {
  const [stakedTokenPriceInDollars, setStakedTokenPriceInDollars] = useState('0');
  const spaceFinance = useSpaceFinance();
  const isUnlocked = spaceFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await spaceFinance.getDepositTokenPriceInDollars(stakedTokenName, stakedToken);
    setStakedTokenPriceInDollars(balance);
  }, [stakedToken, stakedTokenName, spaceFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshStakedTokenPriceInDollars = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshStakedTokenPriceInDollars);
    }
  }, [isUnlocked, setStakedTokenPriceInDollars, spaceFinance, fetchBalance]);

  return stakedTokenPriceInDollars;
};

export default useStakedTokenPriceInDollars;

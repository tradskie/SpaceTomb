import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import ERC20 from '../space-finance/ERC20';
import useSpaceFinance from './useSpaceFinance';
import config from '../config';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();
  const isUnlocked = spaceFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(spaceFinance.myAccount));
  }, [token, spaceFinance.myAccount]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(`Failed to fetch token balance: ${err.stack}`));
      let refreshInterval = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [isUnlocked, token, fetchBalance, spaceFinance]);

  return balance;
};

export default useTokenBalance;

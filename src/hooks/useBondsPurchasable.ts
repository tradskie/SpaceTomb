import {useCallback, useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import ERC20 from '../space-finance/ERC20';
import useSpaceFinance from './useSpaceFinance';
import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
      try {
        setBalance(await spaceFinance.getBondsPurchasable());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondsPurchasable();
  }, [setBalance, spaceFinance]);

  return balance;
};

export default useBondsPurchasable;

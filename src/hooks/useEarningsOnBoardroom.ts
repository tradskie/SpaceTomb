import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSpaceFinance from './useSpaceFinance';
import useRefresh from './useRefresh';

const useEarningsOnBoardroom = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();
  const isUnlocked = spaceFinance?.isUnlocked;

  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await spaceFinance.getEarningsOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [isUnlocked, spaceFinance, slowRefresh]);

  return balance;
};

export default useEarningsOnBoardroom;

import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSpaceFinance from './useSpaceFinance';
import useRefresh from './useRefresh';

const useStakedBalanceOnBoardroom = () => {
  const {slowRefresh} = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();
  const isUnlocked = spaceFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await spaceFinance.getStakedSharesOnBoardroom());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, spaceFinance]);
  return balance;
};

export default useStakedBalanceOnBoardroom;

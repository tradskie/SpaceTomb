import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const {slowRefresh} = useRefresh();
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await spaceFinance.getTotalValueLocked());
      } catch (err) {
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, spaceFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;

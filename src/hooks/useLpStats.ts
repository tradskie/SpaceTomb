import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {LPStat} from '../space-finance/types';
import useRefresh from './useRefresh';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const {slowRefresh} = useRefresh();
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try {
        setStat(await spaceFinance.getLPStat(lpTicker));
      } catch (err) {
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, spaceFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStats;

import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {TokenStat} from '../space-finance/types';
import useRefresh from './useRefresh';

const useBtcStats = () => {
  const [stat, setStat] = useState<Number>();
  const {slowRefresh} = useRefresh();
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await spaceFinance.getBTCPriceUSD());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, spaceFinance, slowRefresh]);

  return stat;
};

export default useBtcStats;

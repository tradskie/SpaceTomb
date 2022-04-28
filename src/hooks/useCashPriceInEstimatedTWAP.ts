import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {TokenStat} from '../space-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const spaceFinance = useSpaceFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await spaceFinance.getSpaceStatInEstimatedTWAP());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, spaceFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;

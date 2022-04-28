import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {TokenStat} from '../space-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await spaceFinance.getShareStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSharePrice();
  }, [setStat, spaceFinance, slowRefresh]);

  return stat;
};

export default useShareStats;

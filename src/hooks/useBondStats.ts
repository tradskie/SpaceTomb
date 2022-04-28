import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {TokenStat} from '../space-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {slowRefresh} = useRefresh();
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await spaceFinance.getBondStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, spaceFinance, slowRefresh]);

  return stat;
};

export default useBondStats;

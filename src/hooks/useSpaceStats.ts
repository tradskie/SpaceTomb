import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {TokenStat} from '../space-finance/types';
import useRefresh from './useRefresh';

const useSpaceStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const {fastRefresh} = useRefresh();
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    async function fetchSpacePrice() {
      try {
        setStat(await spaceFinance.getSpaceStat());
      } catch (err) {
        console.error(err);
      }
    }
    fetchSpacePrice();
  }, [setStat, spaceFinance, fastRefresh]);

  return stat;
};

export default useSpaceStats;

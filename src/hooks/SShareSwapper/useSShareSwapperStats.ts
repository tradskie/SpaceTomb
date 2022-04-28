import {useEffect, useState} from 'react';
import useSpaceFinance from '../useSpaceFinance';
import {SShareSwapperStat} from '../../space-finance/types';
import useRefresh from '../useRefresh';

const useSShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<SShareSwapperStat>();
  const {fastRefresh /*, slowRefresh*/} = useRefresh();
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    async function fetchSShareSwapperStat() {
      try {
        if (spaceFinance.myAccount) {
          setStat(await spaceFinance.getSShareSwapperStat(account));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSShareSwapperStat();
  }, [setStat, spaceFinance, fastRefresh, account]);

  return stat;
};

export default useSShareSwapperStats;

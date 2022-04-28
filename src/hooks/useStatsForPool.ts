import {useCallback, useState, useEffect} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {Bank} from '../space-finance';
import {PoolStats} from '../space-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const spaceFinance = useSpaceFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await spaceFinance.getPoolAPRs(bank));
  }, [spaceFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch APR info: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, spaceFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPool;

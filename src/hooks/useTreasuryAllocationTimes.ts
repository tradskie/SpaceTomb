import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {AllocationTime} from '../space-finance/types';
import useRefresh from './useRefresh';

const useTreasuryAllocationTimes = () => {
  const {slowRefresh} = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const spaceFinance = useSpaceFinance();
  useEffect(() => {
    if (spaceFinance) {
      spaceFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [spaceFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;

import {useEffect, useState} from 'react';
import useSpaceFinance from '../useSpaceFinance';
import {AllocationTime} from '../../space-finance/types';

const useClaimRewardTimerBoardroom = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    if (spaceFinance) {
      spaceFinance.getUserClaimRewardTime().then(setTime);
    }
  }, [spaceFinance]);
  return time;
};

export default useClaimRewardTimerBoardroom;

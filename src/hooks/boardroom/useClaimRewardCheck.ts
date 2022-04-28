import {useEffect, useState} from 'react';
import useRefresh from '../useRefresh';
import useSpaceFinance from '../useSpaceFinance';

const useClaimRewardCheck = () => {
  const {slowRefresh} = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const spaceFinance = useSpaceFinance();
  const isUnlocked = spaceFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await spaceFinance.canUserClaimRewardFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, spaceFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;

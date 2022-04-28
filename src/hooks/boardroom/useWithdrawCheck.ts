import {useEffect, useState} from 'react';
import useSpaceFinance from '../useSpaceFinance';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const spaceFinance = useSpaceFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = spaceFinance?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await spaceFinance.canUserUnstakeFromBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, spaceFinance, slowRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;

import {useCallback, useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useStakedBalanceOnBoardroom from './useStakedBalanceOnBoardroom';

const useBoardroomVersion = () => {
  const [boardroomVersion, setBoardroomVersion] = useState('latest');
  const spaceFinance = useSpaceFinance();
  const stakedBalance = useStakedBalanceOnBoardroom();

  const updateState = useCallback(async () => {
    setBoardroomVersion(await spaceFinance.fetchBoardroomVersionOfUser());
  }, [spaceFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (spaceFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [spaceFinance?.isUnlocked, stakedBalance]);

  return boardroomVersion;
};

export default useBoardroomVersion;

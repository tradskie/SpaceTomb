import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSpaceFinance from './useSpaceFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnBoardroom = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();
  const {slowRefresh} = useRefresh();
  const isUnlocked = spaceFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await spaceFinance.getTotalStakedInBoardroom());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, spaceFinance]);

  return totalStaked;
};

export default useTotalStakedOnBoardroom;

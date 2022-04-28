import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import {BigNumber} from 'ethers';
import useRefresh from './useRefresh';

const useCurrentEpoch = () => {
  const [currentEpoch, setCurrentEpoch] = useState<BigNumber>(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchCurrentEpoch() {
      try {
        setCurrentEpoch(await spaceFinance.getCurrentEpoch());
      } catch (err) {
        console.error(err);
      }
    }
    fetchCurrentEpoch();
  }, [setCurrentEpoch, spaceFinance, slowRefresh]);

  return currentEpoch;
};

export default useCurrentEpoch;

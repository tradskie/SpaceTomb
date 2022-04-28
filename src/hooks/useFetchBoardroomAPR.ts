import {useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useRefresh from './useRefresh';

const useFetchBoardroomAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const spaceFinance = useSpaceFinance();
  const {slowRefresh} = useRefresh();

  useEffect(() => {
    async function fetchBoardroomAPR() {
      try {
        setApr(await spaceFinance.getBoardroomAPR());
      } catch (err) {
        console.error(err);
      }
    }
    fetchBoardroomAPR();
  }, [setApr, spaceFinance, slowRefresh]);

  return apr;
};

export default useFetchBoardroomAPR;

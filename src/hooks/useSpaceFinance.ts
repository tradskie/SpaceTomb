import {useContext} from 'react';
import {Context} from '../contexts/SpaceFinanceProvider';

const useSpaceFinance = () => {
  const {spaceFinance} = useContext(Context);
  return spaceFinance;
};

export default useSpaceFinance;

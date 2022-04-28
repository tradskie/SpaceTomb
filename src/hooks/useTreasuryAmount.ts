import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import useSpaceFinance from './useSpaceFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();

  useEffect(() => {
    if (spaceFinance) {
      const {Treasury} = spaceFinance.contracts;
      spaceFinance.SPACE.balanceOf(Treasury.address).then(setAmount);
    }
  }, [spaceFinance]);
  return amount;
};

export default useTreasuryAmount;

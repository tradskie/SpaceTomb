import {useCallback} from 'react';
import useSpaceFinance from './useSpaceFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';
import {TAX_OFFICE_ADDR} from '../utils/constants';

const useProvideSpaceFtmLP = () => {
  const spaceFinance = useSpaceFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideSpaceFtmLP = useCallback(
    (ftmAmount: string, spaceAmount: string) => {
      const spaceAmountBn = parseUnits(spaceAmount);
      handleTransactionReceipt(
        spaceFinance.provideSpaceFtmLP(ftmAmount, spaceAmountBn),
        `Provide SPACE-BTCB LP ${spaceAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [spaceFinance, handleTransactionReceipt],
  );
  return {onProvideSpaceFtmLP: handleProvideSpaceFtmLP};
};

export default useProvideSpaceFtmLP;

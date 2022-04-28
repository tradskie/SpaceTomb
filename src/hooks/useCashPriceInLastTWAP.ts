import {useCallback, useEffect, useState} from 'react';
import useSpaceFinance from './useSpaceFinance';
import config from '../config';
import {BigNumber} from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const spaceFinance = useSpaceFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await spaceFinance.getSpacePriceInLastTWAP());
  }, [spaceFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch SPACE price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, spaceFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;

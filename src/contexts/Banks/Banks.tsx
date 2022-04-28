import React, {useCallback, useEffect, useState} from 'react';
import Context from './context';
import useSpaceFinance from '../../hooks/useSpaceFinance';
import {Bank} from '../../space-finance';
import config, {bankDefinitions} from '../../config';

const Banks: React.FC = ({children}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const spaceFinance = useSpaceFinance();
  const isUnlocked = spaceFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!spaceFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await spaceFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          spaceFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: spaceFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'SPACE' ? spaceFinance.SPACE : spaceFinance.SSHARE,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [spaceFinance, setBanks]);

  useEffect(() => {
    if (spaceFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, spaceFinance, fetchPools]);

  return <Context.Provider value={{banks}}>{children}</Context.Provider>;
};

export default Banks;

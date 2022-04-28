import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';
import SpaceFinance from '../../space-finance';
import config from '../../config';

export interface SpaceFinanceContext {
  spaceFinance?: SpaceFinance;
}

export const Context = createContext<SpaceFinanceContext>({spaceFinance: null});

export const SpaceFinanceProvider: React.FC = ({children}) => {
  const {ethereum, account} = useWallet();
  const [spaceFinance, setSpaceFinance] = useState<SpaceFinance>();

  useEffect(() => {
    if (!spaceFinance) {
      const space = new SpaceFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        space.unlockWallet(ethereum, account);
      }
      setSpaceFinance(space);
    } else if (account) {
      spaceFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, spaceFinance]);

  return <Context.Provider value={{spaceFinance}}>{children}</Context.Provider>;
};

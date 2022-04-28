import React, {useCallback, useMemo} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useSpaceStats from '../../hooks/useSpaceStats';
import useSpaceFinance from '../../hooks/useSpaceFinance';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import {useTransactionAdder} from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import {getDisplayBalance} from '../../utils/formatBalance';
import {BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN} from '../../space-finance/constants';

import HomeImage from '../../assets/img/background.jpg';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const Bond: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const spaceFinance = useSpaceFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const spaceStat = useSpaceStats();
  const cashPrice = useCashPriceInLastTWAP();

  const bondsPurchasable = useBondsPurchasable();

  const bondBalance = useTokenBalance(spaceFinance?.SBOND);
  // const scalingFactor = useMemo(() => (cashPrice ? Number(cashPrice).toFixed(4) : null), [cashPrice]);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await spaceFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} SBOND with ${amount} SPACE`,
      });
    },
    [spaceFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await spaceFinance.redeemBonds(amount);
      addTransaction(tx, {summary: `Redeem ${amount} SBOND`});
    },
    [spaceFinance, addTransaction],
  );
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="Buy &amp; Redeem Bonds" subtitle="Earn premiums upon redemption" />
            </Route>
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={spaceFinance.SPACE}
                  fromTokenName="SPACE"
                  toToken={spaceFinance.SBOND}
                  toTokenName="SBOND"
                  priceDesc={
                    !isBondPurchasable
                      ? 'SPACE is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' SBOND available for purchase'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || isBondRedeemable}
                />
              </StyledCardWrapper>
              <StyledStatsWrapper>
                <ExchangeStat
                  tokenName="10,000 SPACE"
                  description="Last-Hour TWAP Price"
                  price={Number(spaceStat?.tokenInFtm).toFixed(4) || '-'}
                />
                <Spacer size="md" />
                <ExchangeStat
                  tokenName="10,000 SBOND"
                  description="Current Price: (SPACE)^2"
                  price={Number(bondStat?.tokenInFtm).toFixed(4) || '-'}
                />
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={spaceFinance.SBOND}
                  fromTokenName="SBOND"
                  toToken={spaceFinance.SPACE}
                  toTokenName="SPACE"
                  priceDesc={`${getDisplayBalance(bondBalance)} SBOND Available in wallet`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                  disabledDescription={!isBondRedeemable ? `Enabled when 10,000 SPACE > ${BOND_REDEEM_PRICE}BTC` : null}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;

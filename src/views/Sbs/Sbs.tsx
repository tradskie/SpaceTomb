import React, {/*useCallback, useEffect, */ useMemo, useState} from 'react';
import Page from '../../components/Page';
import BondImage from '../../assets/img/pit.png';
import {createGlobalStyle} from 'styled-components';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import {useWallet} from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import {Box, /* Paper, Typography,*/ Button, Grid} from '@material-ui/core';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useSpaceFinance from '../../hooks/useSpaceFinance';
import {getDisplayBalance /*, getBalance*/} from '../../utils/formatBalance';
import {BigNumber /*, ethers*/} from 'ethers';
import useSwapSBondToSShare from '../../hooks/SShareSwapper/useSwapSBondToSShare';
import useApprove, {ApprovalState} from '../../hooks/useApprove';
import useSShareSwapperStats from '../../hooks/SShareSwapper/useSShareSwapperStats';
import TokenInput from '../../components/TokenInput';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import TokenSymbol from '../../components/TokenSymbol';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BondImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Sbs: React.FC = () => {
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const spaceFinance = useSpaceFinance();
  const [sbondAmount, setSbondAmount] = useState('');
  const [sshareAmount, setSshareAmount] = useState('');

  const [approveStatus, approve] = useApprove(spaceFinance.SBOND, spaceFinance.contracts.SShareSwapper.address);
  const {onSwapSShare} = useSwapSBondToSShare();
  const sshareSwapperStat = useSShareSwapperStats(account);

  const sshareBalance = useMemo(
    () => (sshareSwapperStat ? Number(sshareSwapperStat.sshareBalance) : 0),
    [sshareSwapperStat],
  );
  const bondBalance = useMemo(
    () => (sshareSwapperStat ? Number(sshareSwapperStat.sbondBalance) : 0),
    [sshareSwapperStat],
  );

  const handleSBondChange = async (e: any) => {
    if (e.currentTarget.value === '') {
      setSbondAmount('');
      setSshareAmount('');
      return;
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setSbondAmount(e.currentTarget.value);
    const updateSShareAmount = await spaceFinance.estimateAmountOfSShare(e.currentTarget.value);
    setSshareAmount(updateSShareAmount);
  };

  const handleSBondSelectMax = async () => {
    setSbondAmount(String(bondBalance));
    const updateSShareAmount = await spaceFinance.estimateAmountOfSShare(String(bondBalance));
    setSshareAmount(updateSShareAmount);
  };

  const handleSShareSelectMax = async () => {
    setSshareAmount(String(sshareBalance));
    const rateSSharePerSpace = (await spaceFinance.getSShareSwapperStat(account)).rateSSharePerSpace;
    const updateSBondAmount = BigNumber.from(10)
      .pow(30)
      .div(BigNumber.from(rateSSharePerSpace))
      .mul(Number(sshareBalance) * 1e6);
    setSbondAmount(getDisplayBalance(updateSBondAmount, 18, 6));
  };

  const handleSShareChange = async (e: any) => {
    const inputData = e.currentTarget.value;
    if (inputData === '') {
      setSshareAmount('');
      setSbondAmount('');
      return;
    }
    if (!isNumeric(inputData)) return;
    setSshareAmount(inputData);
    const rateSSharePerSpace = (await spaceFinance.getSShareSwapperStat(account)).rateSSharePerSpace;
    const updateSBondAmount = BigNumber.from(10)
      .pow(30)
      .div(BigNumber.from(rateSSharePerSpace))
      .mul(Number(inputData) * 1e6);
    setSbondAmount(getDisplayBalance(updateSBondAmount, 18, 6));
  };

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="SBOND -> SShare Swap" subtitle="Swap SBond to SShare" />
            </Route>
            <Box mt={5}>
              <Grid container justify="center" spacing={6}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>SBonds</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={spaceFinance.SBOND.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleSBondSelectMax}
                                onChange={handleSBondChange}
                                value={sbondAmount}
                                max={bondBalance}
                                symbol="SBond"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bondBalance} SBOND Available in Wallet`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                    <Spacer size="lg" />
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>SShare</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={spaceFinance.SSHARE.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleSShareSelectMax}
                                onChange={handleSShareChange}
                                value={sshareAmount}
                                max={sshareBalance}
                                symbol="SShare"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${sshareBalance} SSHARE Available in Swapper`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Grid>
            </Box>

            <Box mt={5}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <StyledApproveWrapper>
                        {approveStatus !== ApprovalState.APPROVED ? (
                          <Button
                            disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                            color="primary"
                            variant="contained"
                            onClick={approve}
                            size="medium"
                          >
                            Approve SBOND
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => onSwapSShare(sbondAmount.toString())}
                            size="medium"
                          >
                            Swap
                          </Button>
                        )}
                      </StyledApproveWrapper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
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
    width: 100%;
  }
`;

const StyledApproveWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDesc = styled.span``;

export default Sbs;

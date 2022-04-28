import React, {useMemo, useState} from 'react';
import Page from '../../components/Page';
import {createGlobalStyle} from 'styled-components';
import HomeImage from '../../assets/img/background.jpg';
import useLpStats from '../../hooks/useLpStats';
import {Box, Button, Grid, Paper, Typography} from '@material-ui/core';
import useSpaceStats from '../../hooks/useSpaceStats';
import TokenInput from '../../components/TokenInput';
import useSpaceFinance from '../../hooks/useSpaceFinance';
import {useWallet} from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import {ApprovalState} from '../../hooks/useApprove';
import useProvideSpaceFtmLP from '../../hooks/useProvideSpaceFtmLP';
import {Alert} from '@material-ui/lab';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const ProvideLiquidity = () => {
  const [spaceAmount, setSpaceAmount] = useState(0);
  const [ftmAmount, setFtmAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const {balance} = useWallet();
  const spaceStats = useSpaceStats();
  const spaceFinance = useSpaceFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const spaceBalance = useTokenBalance(spaceFinance.SPACE);
  const btcBalance = useTokenBalance(spaceFinance.BTC);

  const ftmBalance = (btcBalance / 1e18).toFixed(4);
  const {onProvideSpaceFtmLP} = useProvideSpaceFtmLP();
  const spaceFtmLpStats = useLpStats('SPACE-BTCB-LP');

  const spaceLPStats = useMemo(() => (spaceFtmLpStats ? spaceFtmLpStats : null), [spaceFtmLpStats]);
  const spacePriceInBNB = useMemo(() => (spaceStats ? Number(spaceStats.tokenInFtm).toFixed(2) : null), [spaceStats]);
  const ftmPriceInSPACE = useMemo(() => (spaceStats ? Number(1 / spaceStats.tokenInFtm).toFixed(2) : null), [spaceStats]);
  // const classes = useStyles();

  const handleSpaceChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setSpaceAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setSpaceAmount(e.currentTarget.value);
    const quoteFromSpooky = await spaceFinance.quoteFromSpooky(e.currentTarget.value, 'SPACE');
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / spaceLPStats.ftmAmount);
  };

  const handleFtmChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setFtmAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setFtmAmount(e.currentTarget.value);
    const quoteFromSpooky = await spaceFinance.quoteFromSpooky(e.currentTarget.value, 'BTCB');
    setSpaceAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / spaceLPStats.tokenAmount);
  };
  const handleSpaceSelectMax = async () => {
    const quoteFromSpooky = await spaceFinance.quoteFromSpooky(getDisplayBalance(spaceBalance), 'SPACE');
    setSpaceAmount(getDisplayBalance(spaceBalance));
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / spaceLPStats.ftmAmount);
  };
  const handleFtmSelectMax = async () => {
    const quoteFromSpooky = await spaceFinance.quoteFromSpooky(ftmBalance, 'BNB');
    setFtmAmount(ftmBalance);
    setSpaceAmount(quoteFromSpooky);
    setLpTokensAmount(ftmBalance / spaceLPStats.ftmAmount);
  };
  return (
    <Page>
      <BackgroundImage />
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justify="center">
        <Box style={{width: '600px'}}>
          <Alert variant="filled" severity="warning" style={{marginBottom: '10px'}}>
            <b>
              This and{' '}
              <a href="https://pancakeswap.finance/" rel="noopener noreferrer" target="_blank">
                Pancakeswap
              </a>{' '}
              are the only ways to provide Liquidity on SPACE-BTCB pair without paying tax.
            </b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{borderRadius: 15}}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleSpaceSelectMax}
                          onChange={handleSpaceChange}
                          value={spaceAmount}
                          max={getDisplayBalance(spaceBalance)}
                          symbol={'SPACE'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleFtmSelectMax}
                          onChange={handleFtmChange}
                          value={ftmAmount}
                          max={ftmBalance}
                          symbol={'BTCB'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 SPACE = {spacePriceInBNB} BNB</p>
                        <p>1 BNB = {ftmPriceInSPACE} SPACE</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{textAlign: 'center'}}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvideSpaceFtmLP(ftmAmount.toString(), spaceAmount.toString())}
                            color="primary"
                            style={{margin: '0 10px', color: '#fff'}}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="secondary"
                            style={{margin: '0 10px'}}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;

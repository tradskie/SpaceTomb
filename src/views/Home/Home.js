import React, { useMemo } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useSpaceStats from '../../hooks/useSpaceStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usesShareStats from '../../hooks/usesShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Space as spaceTesting, SShare as sShareTesting } from '../../space-finance/deployments/deployments.testing.json';
import { Space as spaceProd, SShare as sShareProd } from '../../space-finance/deployments/deployments.mainnet.json';
import { roundAndFormatNumber } from '../../0x';
import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useSpaceFinance from '../../hooks/useSpaceFinance';
import { ReactComponent as IconTelegram } from '../../assets/img/telegram.svg';

//import SpaceImage from '../../assets/img/space.png';

import HomeImage from '../../assets/img/background.jpg';
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

// const BackgroundImage = createGlobalStyle`
//   body {
//     background-color: grey;
//     background-size: cover !important;
//   }
// `;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      // marginTop: '10px'
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const spaceFtmLpStats = useLpStatsBTC('SPACE-BTCB-LP');
  const sShareFtmLpStats = useLpStats('SSHARE-BNB-LP');
  const spaceStats = useSpaceStats();
  const sShareStats = usesShareStats();
  const tBondStats = useBondStats();
  const spaceFinance = useSpaceFinance();

  let space;
  let sShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    space = spaceTesting;
    sShare = sShareTesting;
  } else {
    space = spaceProd;
    sShare = sShareProd;
  }

  const buySpaceAddress =
    'https://pancakeswap.finance/swap?inputCurrency=0x18f3092bB7630559795bfDcB067b906580E6C886&outputCurrency=' +
    space.address;
  const buySShareAddress = 'https://pancakeswap.finance/swap?outputCurrency=0x68aE26bCba825033F6e02579650116e0c2EF1a44';

  const spaceLPStats = useMemo(() => (spaceFtmLpStats ? spaceFtmLpStats : null), [spaceFtmLpStats]);
  const sshareLPStats = useMemo(() => (sShareFtmLpStats ? sShareFtmLpStats : null), [sShareFtmLpStats]);
  const spacePriceInDollars = useMemo(
    () => (spaceStats ? Number(spaceStats.priceInDollars).toFixed(2) : null),
    [spaceStats],
  );
  const spacePriceInBNB = useMemo(() => (spaceStats ? Number(spaceStats.tokenInFtm).toFixed(4) : null), [spaceStats]);
  const spaceCirculatingSupply = useMemo(() => (spaceStats ? String(spaceStats.circulatingSupply) : null), [spaceStats]);
  const spaceTotalSupply = useMemo(() => (spaceStats ? String(spaceStats.totalSupply) : null), [spaceStats]);

  const sSharePriceInDollars = useMemo(
    () => (sShareStats ? Number(sShareStats.priceInDollars).toFixed(2) : null),
    [sShareStats],
  );
  const sSharePriceInBNB = useMemo(
    () => (sShareStats ? Number(sShareStats.tokenInFtm).toFixed(4) : null),
    [sShareStats],
  );
  const sShareCirculatingSupply = useMemo(
    () => (sShareStats ? String(sShareStats.circulatingSupply) : null),
    [sShareStats],
  );
  const sShareTotalSupply = useMemo(() => (sShareStats ? String(sShareStats.totalSupply) : null), [sShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const spaceLpZap = useZap({ depositTokenName: 'SPACE-BTCB-LP' });
  const sshareLpZap = useZap({ depositTokenName: 'SSHARE-BNB-LP' });

  const [onPresentSpaceZap, onDissmissSpaceZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        spaceLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissSpaceZap();
      }}
      tokenName={'SPACE-BTCB-LP'}
    />,
  );

  const [onPresentSshareZap, onDissmissSshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        sshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissSshareZap();
      }}
      tokenName={'SSHARE-BNB-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
     <Grid item xs={12} sm={4}>
          <Paper>
            <Box p={4}>
              <h2>Schedule</h2>
              <ul>
              <li>
                  <strong>Genesis Farm:</strong> Jan ?? 2022 - 24hrs {/*  Nov 21 23:00 - 24 hrs */}
                </li>
                <li>
                  <strong>Space Farm:</strong> Jan ?? 2022 - 5 days {/*Nov 22 23:00 - 5 days */}
                </li>
                <li>
                  <strong>SSHARE Farm:</strong> Jan ?? 2022 - 365 days {/*Nov 25 23:00 - 365 days */}
                </li>
                <li>
                  <strong>Boardroom:</strong> Jan ?? 2022 {/*Dec 1 00:00 */}
                </li>
              </ul>
            </Box>
          </Paper>
        </Grid> 
    {/*    <Grid
          item
          xs={12}
          sm={4}
          style={{display: 'flex', justifyContent: 'center', verticalAlign: 'middle', overflow: 'hidden'}}
        >
          <img src={SpaceImage} style={{ maxHeight: '240px' }} />
        </Grid> */}
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{ textAlign: 'center' }}>
              <h2>Welcome to Space</h2>
              <p>
                SPACE is an algocoin which is designed to follow the price of BTC. Enjoy high yields normally only found
                on high risk assets, but with exposure to BTC instead!
           {/*    </p>
              <p>
                <strong>SPACE is pegged via algorithm to a 10,000:1 ratio to BTC. $100k BTC = $10 SPACE PEG</strong> 
                 Stake your SPACE-BTC LP in the Farm to earn SSHARE rewards. Then stake your earned SSHARE in the
                Boardroom to earn more SPACE!  */}
              </p>
              <p>
                <IconTelegram alt="telegram" style={{ fill: '#dddfee', height: '15px' }} /> Join our{' '}
                <a
                  href="https://t.me/+i2BsN-BmdeFiOTI0"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ color: '#dddfee' }}
                >
                  Telegram
                </a>{' '}
                to find out more!
              </p>
            </Box>
          </Paper>
        </Grid>

        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={12} justify="center" style={{ margin: '12px', display: 'flex' }}>

            <Alert variant="filled" severity="warning">
              Board<br />
              <b>Please unstake all SSHARE for now. Timer to withdraw will be removed shortly. </b><br />We are very sorry for the inconvenience.

            </Alert>

          </Grid>
        </Grid> */}

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button href="/boardroom" className="shinyButton" style={{ margin: '10px' }}>
                Stake Now
              </Button>
              <Button href="/farm" className="shinyButton" style={{ margin: '10px' }}>
                Farm Now
              </Button>
              <Button
                target="_blank"
                href={buySpaceAddress}
                style={{ margin: '10px' }}
                className={'shinyButton ' + classes.button}
              >
                Buy SPACE
              </Button>
              <Button
                target="_blank"
                href={buySShareAddress}
                className={'shinyButton ' + classes.button}
                style={{ marginLeft: '10px' }}
              >
                Buy SSHARE
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* SPACE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="SPACE" />
                </CardIcon>
              </Box>
              <Button
                onClick={() => {
                  spaceFinance.watchAssetInMetamask('SPACE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <h2 style={{ marginBottom: '10px' }}>SPACE</h2>
              10,000 SPACE (1.0 Peg) =
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>{spacePriceInBNB ? spacePriceInBNB : '-.----'} BTC</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${spacePriceInDollars ? roundAndFormatNumber(spacePriceInDollars, 2) : '-.--'} / SPACE
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber(spaceCirculatingSupply * spacePriceInDollars, 2)} <br />
                Circulating Supply: {roundAndFormatNumber(spaceCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(spaceTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* SSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  spaceFinance.watchAssetInMetamask('SSHARE');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="SSHARE" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>SSHARE</h2>
              Current Price
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {sSharePriceInBNB ? sSharePriceInBNB : '-.----'} BNB
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${sSharePriceInDollars ? sSharePriceInDollars : '-.--'} / SSHARE</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((sShareCirculatingSupply * sSharePriceInDollars).toFixed(2), 2)}{' '}
                <br />
                Circulating Supply: {roundAndFormatNumber(sShareCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(sShareTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* SBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <Button
                onClick={() => {
                  spaceFinance.watchAssetInMetamask('SBOND');
                }}
                style={{ position: 'absolute', top: '10px', right: '10px', border: '1px grey solid' }}
              >
                {' '}
                <b>+</b>&nbsp;&nbsp;
                <img alt="metamask fox" style={{ width: '20px', filter: 'grayscale(100%)' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="SBOND" />
                </CardIcon>
              </Box>
              <h2 style={{ marginBottom: '10px' }}>SBOND</h2>
              10,000 SBOND
              <Box>
                <span style={{ fontSize: '30px', color: 'white' }}>
                  {tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTC
                </span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'} / SBOND</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${roundAndFormatNumber((tBondCirculatingSupply * tBondPriceInDollars).toFixed(2), 2)} <br />
                Circulating Supply: {roundAndFormatNumber(tBondCirculatingSupply, 2)} <br />
                Total Supply: {roundAndFormatNumber(tBondTotalSupply, 2)}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="SPACE-BTCB-LP" />
                </CardIcon>
              </Box>
              <h2>SPACE-BTCB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button disabled onClick={onPresentSpaceZap} className="shinyButtonDisabledSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {spaceLPStats?.tokenAmount ? spaceLPStats?.tokenAmount : '-.--'} SPACE /{' '}
                  {spaceLPStats?.ftmAmount ? spaceLPStats?.ftmAmount : '-.--'} BTCB
                </span>
              </Box>
              <Box>${spaceLPStats?.priceOfOne ? spaceLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${spaceLPStats?.totalLiquidity ? roundAndFormatNumber(spaceLPStats.totalLiquidity, 2) : '-.--'}{' '}
                <br />
                Total Supply: {spaceLPStats?.totalSupply ? roundAndFormatNumber(spaceLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="SSHARE-BNB-LP" />
                </CardIcon>
              </Box>
              <h2>SSHARE-BNB PancakeSwap LP</h2>
              <Box mt={2}>
                <Button onClick={onPresentSshareZap} className="shinyButtonSecondary">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {sshareLPStats?.tokenAmount ? sshareLPStats?.tokenAmount : '-.--'} SSHARE /{' '}
                  {sshareLPStats?.ftmAmount ? sshareLPStats?.ftmAmount : '-.--'} BNB
                </span>
              </Box>
              <Box>${sshareLPStats?.priceOfOne ? sshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: $
                {sshareLPStats?.totalLiquidity ? roundAndFormatNumber(sshareLPStats.totalLiquidity, 2) : '-.--'}
                <br />
                Total Supply: {sshareLPStats?.totalSupply ? roundAndFormatNumber(sshareLPStats.totalSupply, 2) : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;

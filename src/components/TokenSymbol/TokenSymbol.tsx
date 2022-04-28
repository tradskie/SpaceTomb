import React from 'react';

//Graveyard ecosystem logos
import spaceLogo from '../../assets/img/space.png';
import tShareLogo from '../../assets/img/sshares.png';
import spaceLogoPNG from '../../assets/img/space.png';
import tShareLogoPNG from '../../assets/img/sshares.png';
import tBondLogo from '../../assets/img/sbond.png';

import spaceFtmLpLogo from '../../assets/img/space-bitcoin-LP.png';
import sshareFtmLpLogo from '../../assets/img/sshare-bnb-LP.png';

import bnbLogo from '../../assets/img/bnb.png';
import btcLogo from '../../assets/img/BCTB-icon.png';

const logosBySymbol: {[title: string]: string} = {
  //Real tokens
  //=====================
  SPACE: spaceLogo,
  SPACEPNG: spaceLogoPNG,
  SSHAREPNG: tShareLogoPNG,
  SSHARE: tShareLogo,
  SBOND: tBondLogo,
  WBNB: bnbLogo,
  BOO: bnbLogo,
  SHIBA: bnbLogo,
  ZOO: bnbLogo,
  CAKE: bnbLogo,
  SUSD: bnbLogo,
  SBTC: btcLogo,
  BTCB: btcLogo,
  BTC: btcLogo,
  SVL: bnbLogo,
  'SPACE-BNB-LP': spaceFtmLpLogo,
  'SPACE-BTCB-LP': spaceFtmLpLogo,
  'SSHARE-BNB-LP': sshareFtmLpLogo,
  'SSHARE-BNB-APELP': sshareFtmLpLogo,
  'SPACE-BTCB-APELP': spaceFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({symbol, size = 64}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;

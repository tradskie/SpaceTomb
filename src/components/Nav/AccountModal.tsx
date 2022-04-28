import React, {useMemo} from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import {getDisplayBalance} from '../../utils/formatBalance';

import Label from '../Label';
import Modal, {ModalProps} from '../Modal';
import ModalTitle from '../ModalTitle';
import useSpaceFinance from '../../hooks/useSpaceFinance';
import TokenSymbol from '../TokenSymbol';
import {useMediaQuery} from '@material-ui/core';

const AccountModal: React.FC<ModalProps> = ({onDismiss}) => {
  const spaceFinance = useSpaceFinance();

  const spaceBalance = useTokenBalance(spaceFinance.SPACE);
  const displaySpaceBalance = useMemo(() => getDisplayBalance(spaceBalance), [spaceBalance]);

  const sshareBalance = useTokenBalance(spaceFinance.SSHARE);
  const displaySshareBalance = useMemo(() => getDisplayBalance(sshareBalance), [sshareBalance]);

  const sbondBalance = useTokenBalance(spaceFinance.SBOND);
  const displaySbondBalance = useMemo(() => getDisplayBalance(sbondBalance), [sbondBalance]);

  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances style={{display: 'flex', flexDirection: matches ? 'row' : 'column'}}>
        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="SPACE" />
          <StyledBalance>
            <StyledValue>{displaySpaceBalance}</StyledValue>
            <Label text="SPACE Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="SSHARE" />
          <StyledBalance>
            <StyledValue>{displaySshareBalance}</StyledValue>
            <Label text="SSHARE Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper style={{paddingBottom: '15px'}}>
          <TokenSymbol symbol="SBOND" />
          <StyledBalance>
            <StyledValue>{displaySbondBalance}</StyledValue>
            <Label text="SBOND Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;

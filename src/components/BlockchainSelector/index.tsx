import { ChevronDown, Link } from 'react-feather'
import React, { useEffect } from 'react'

import BlockchainLogo from '../BlockchainLogo'
import { CrosschainChain } from '../../state/crosschain/actions'
import styled from 'styled-components'
import { useCrosschainState } from '../../state/crosschain/hooks'
import ArrowDown from '../ArrowDown'

const Container = styled.div`
  border-radius: 14px;
  margin-bottom: 1.5rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  h5 {
    margin-left: 0.3rem;
  }
  p {
    display: flex;
    margin-bottom: 5px;
    align-items: center;
    border-radius: 12px;
    background: rgba(103, 82, 247, 0.25);
    transition: all 0.2s ease-in-out;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-bottom: 20px;
  `};
    span {
      font-size: 14px;
      margin-left: 13px;
    }
    &:hover {
      background: rgba(103, 82, 247, 0.75);
      cursor: pointer;
    }
    &.crosschain {
      position: relative;d;
      width: 186px;
      height: 40px;
      background: rgba(225,248,250,0.12);
      color: #FFFFFF;
      border-radius: 54px;
      ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 229px;
    `};
    }
    &.currentchain {
      background: transparent;
    }
  }
`
const Row = styled.div<{ borderBottom: boolean; isCrossChain?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ isCrossChain }) => (!isCrossChain ? '0 1rem 0 1rem' : '1rem')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? '1px dashed rgba(103, 82, 247, .5)' : 'none')};
  ${({ theme }) => theme.mediaWidth.upToSmall`
  flex-direction: column;
`};
`
const CrossChainWrap = styled.div`
  position: relative;
  width: 252px;
  min-height: 204px;
  background: rgba(18, 21, 56, 0.24);
  box-shadow: inset 2px 2px 5px rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(28px);
  border-radius: 44px;
  padding-left: 30px;
  padding-top: 30px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  width: 100%;
  margin-bottom: 20px;
`};
`
const SubTitle = styled.h3`
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: #a7b1f4;
  opacity: 0.56;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
 text-align: center;
`};
`
const TransferAmount = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 30px;
  letter-spacing: -0.01em;
  color: #c8ceff;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  text-align: center;
  margin-bottom: 0px;
 `};
`
const BottomTitle = styled(SubTitle)`
  position: absolute;
  bottom: 0;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  position: relative;
  text-align: center
 `};
`
const ShowSmall = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  display: block;
  margin-bottom: 20px;
`};
`
const HideSmall = styled.div`
  display: block;
  ${({ theme }) => theme.mediaWidth.upToSmall`
display: none;
`};
`
const FlexOrder = styled.div`
  ${({ theme }) => theme.mediaWidth.upToSmall`
display: flex;
flex-direction: column-reverse;
align-items: center;
`};
`
const BlockchainSelector = ({
  blockchain,
  transferTo,
  supportedChains,
  isCrossChain,
  onShowCrossChainModal,
  onShowTransferChainModal
}: {
  blockchain: string | CrosschainChain | undefined
  transferTo: any // tslint not working here, same as above
  isCrossChain?: boolean
  supportedChains: string[]
  onShowCrossChainModal: () => void
  onShowTransferChainModal: () => void
}) => {
  const { transferAmount } = useCrosschainState()

  const openChangeChainInfo = () => {
    onShowCrossChainModal()
  }

  const openTransferModal = () => {
    onShowTransferChainModal()
  }

  const ArrowRight = () => {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.2354 23.5293L20.2354 15.5293L12.2354 7.5293"
          stroke="#727BBA"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )
  }

  if (!blockchain) {
    return <div />
  }
  // @ts-ignore
  return (
    <Container>
      {!isCrossChain && (
        <Row borderBottom={false} isCrossChain={isCrossChain}>
          <Link size={16} />
          <h5>Blockchain:</h5>
          <p onClick={openChangeChainInfo}>
            <BlockchainLogo
              size="18px"
              blockchain={typeof blockchain === 'string' ? blockchain : ''}
              style={{ marginBottom: '-3px' }}
            />
            <span>{blockchain}</span>
            <ChevronDown size="18" style={{ marginBottom: '-3px' }} />
          </p>
        </Row>
      )}
      {isCrossChain && (
        <Row borderBottom={false} isCrossChain={isCrossChain}>
          <CrossChainWrap>
            <SubTitle>From</SubTitle>
            <FlexOrder>
              <p className="crosschain currentchain">
                <BlockchainLogo
                  size="32px"
                  blockchain={typeof blockchain !== 'string' ? blockchain.name : blockchain}
                  style={{ marginBottom: '-3px' }}
                />
                <span>{typeof blockchain !== 'string' ? blockchain.name : blockchain}</span>
              </p>
              <TransferAmount>{transferAmount || 0}</TransferAmount>
            </FlexOrder>
            <BottomTitle>Curent Blockchain</BottomTitle>
          </CrossChainWrap>

          <HideSmall>
            <ArrowRight />
          </HideSmall>
          <ShowSmall>
            <ArrowDown conditionInput={true} conditionOutput={true} defaultColor="#727BBA" activeColor="white" />
          </ShowSmall>
          <CrossChainWrap>
            <SubTitle>To</SubTitle>
            <FlexOrder>
              <p className="crosschain" onClick={openTransferModal}>
                <BlockchainLogo
                  size="32px"
                  blockchain={typeof transferTo !== 'string' ? transferTo.name : blockchain}
                  style={{ marginBottom: '-3px' }}
                />
                <span>{typeof transferTo !== 'string' ? transferTo.name : blockchain}</span>
                <ChevronDown size="24" style={{ marginBottom: '-3px', position: 'absolute', right: 10 }} />
              </p>
              <TransferAmount>{transferAmount || 0}</TransferAmount>
            </FlexOrder>
            <BottomTitle>Destination Chain</BottomTitle>
          </CrossChainWrap>
        </Row>
      )}
    </Container>
  )
}

export default BlockchainSelector

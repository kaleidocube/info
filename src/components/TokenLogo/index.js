import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils/index.js'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const StyledEthereumLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
          🤔
        </span>
      </Inline>
    )
  }

  // hard coded fixes for trust wallet api issues
  if (address?.toLowerCase() === '0x300a7b57dc85b6a9776e249614abf0fe5c9905fb') {
    // usdc
    address = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  }

  if (address?.toLowerCase() === '0x36be1fd6ff2a6beb34b500a04f89103a524516d8') {
    return (
      <StyledEthereumLogo size={size} {...rest}>
        <img
          src={
            'https://www.gitbook.com/cdn-cgi/image/width=36,dpr=2,height=36,fit=contain,format=auto/https%3A%2F%2F4122358061-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FhE4weeNpCJSNUXnecN1R%252Ficon%252FIhHPLpW7N7dB59PIZfmM%252Ficon%2520transparent%2520256w.png%3Falt%3Dmedia%26token%3D3f656b6f-c557-4f82-ae23-f610a870c0ab'
          }
          style={{
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)',
          }}
          alt=""
        />
      </StyledEthereumLogo>
    )
  }

  const path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
    address
  )}/logo.png`

  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
